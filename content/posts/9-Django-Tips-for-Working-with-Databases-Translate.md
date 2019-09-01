---
title: Django 操作数据库时的 9 条小提示（译）
date: 2018-02-01 16:06:39
tags:
- python
- django
- orm
---
本文翻译自 [Medium][medium] 上的 [9 Django Tips for Working with Databases][source], 原作者 [Haki Benita][author]。

<!--more-->

# 用 filter 做聚合 (aggregation) 操作

在 Django 2.0 之前，如果我们想获取诸如用户总数或者已激活的用户总数等信息，通常需要诉诸于使用 [condition 表达式][condition]:

```python
from django.contrib.auth.models import User
from django.db.models import (
    Count,
    Sum,
    Case,
    When,
    Value,
    IntegerField,
)
User.objects.aggregate(
    total_users=Count('id'),
    total_active_users=Sum(Case(
        When(is_active=True, then=Value(1)),
        default=Value(0),
        output_field=IntegerField(),
    )),
)
```

在 Django 2.0 中加入的在聚合函数中使用 filter 参数简化了这一操作：

```python
from django.contrib.auth.models import User
from django.db.models import Count, F
User.objects.aggregate(
    total_users=Count('id'),
    total_active_users=Count('id', filter=F('is_active')),
)
```

假设我们正在使用 PostgerSQL, 上面两条查询对应的 SQL 语句是：

```sql
SELECT
    COUNT(id) AS total_users,
    SUM(CASE WHEN is_active THEN 1 ELSE 0 END) AS total_active_users
FROM
    auth_users;

SELECT
    COUNT(id) AS total_users,
    COUNT(id) FILTER (WHERE is_active) AS total_active_users
FROM
    auth_users;
```

第二条查询使用了 FILTER(WHERE...) 语句。

# QuerySet 的结果作为 namedtuples 返回

在 Django 2.0 中 [values_list 可以接收一个叫做 named 的参数][named]。当 named 为 True 的时候，values_list 将会返回一个由 namedtuple 组成的列表：

```python
> user.objects.values_list(
    'first_name',
    'last_name',
)[0]
(‘Haki’, ‘Benita’)
> user_names = User.objects.values_list(
    'first_name',
    'last_name',
    named=True,
)
> user_names[0]
Row(first_name='Haki', last_name='Benita')
> user_names[0].first_name
'Haki'
> user_names[0].last_name
'Benita'
```

# 自定义函数

Django ORM 非常实用而且功能丰富，但是它不可能满足所有的数据库。幸运的是 ORM 允许我们用自定义函数来对它进行扩展。

假设我们有一个 Report model，其中包含一个 duration 字段。如果要获取平均延期时间的话：

```python
from django.db.models import Avg
Report.objects.aggregate(avg_duration=Avg(‘duration’))
> {'avg_duration': datetime.timedelta(0, 0, 55432)}
```

但是当我们想要获取标准差的时候：

```python
from django.db.models import Avg, StdDev
Report.objects.aggregate(
    avg_duration=Avg('duration'),
    std_duration=StdDev('duration'),
)
ProgrammingError: function stddev_pop(interval) does not exist
LINE 1: SELECT STDDEV_POP("report"."duration") AS "std_dura...
               ^
HINT:  No function matches the given name and argument types. You might need to add explicit type casts.
```

这就出现了问题，因为 PostgreSQL 不支持对于 interval type 的 stddev 操作。我们得先把 interval 转换成 number, 然后再对其进行 `STDDEV_POP` 操作。

解决方法之一就是在 duration 上执行 epoch 操作：

```
SELECT
    AVG(duration),
    STDDEV_POP(EXTRACT(EPOCH FROM duration))
FROM
    report;
      avg       |    stddev_pop
----------------+------------------
 00:00:00.55432 | 1.06310113695549
(1 row)
```

通过[自定义函数][custom function]，我们可以在 Django 中进行这个操作：

```python
# common/db.py
from django.db.models import Func
class Epoch(Func):
   function = 'EXTRACT'
   template = "%(function)s('epoch' from %(expressions)s)"
```

然后使用这个新的函数：

```
from django.db.models import Avg, StdDev, F
from common.db import Epoch
Report.objects.aggregate(
    avg_duration=Avg('duration'),
    std_duration=StdDev(Epoch(F('duration'))),
)
{'avg_duration': datetime.timedelta(0, 0, 55432),
 'std_duration': 1.06310113695549}
```

注意我们在 Epoch 中使用了 [F 表达式][F expression]

『译者注』可能某些读者没接触过 PostgreSQL, 我在这里贴出一些链接，帮助大家了解一下本段中涉及到的 PostgreSQL 关键字：
- [interval data type](http://www.postgresqltutorial.com/postgresql-interval/)
- [EXTRACT](https://w3resource.com/PostgreSQL/extract-function.php)
- [STDDEV_POP](https://www.cloudera.com/documentation/enterprise/5-3-x/topics/impala_stddev.html)

# 语句超时

这可能是本文给出的最重要、最简洁的建议。在编写应用时出错是难以避免的事情，我们无法预料并处理所有的边界情况 (edge case)，所以__我们必须设置边界__。

不同于那些非阻塞的 app 服务器（如 Tornado, asyncio 或 Node），Django 使用阻塞式的工作进程。这意味着__如果一个用户执行了一项长耗时操作，则在这项操作完成前，工作进程会一直阻塞且无法被其他用户使用__。

虽然没人会在生产环境中使用单个工作进程，我们仍然应该确保单个查询不会占用过多的时间。

在大多数 Django 应用中数据库查询都会占用很多时间，所以__[为 SQL 查询设置超时][set sql timeout] 是一个很好的习惯__。

我们通常会在 wsgi.py 中做全局超时设置：

```python
# wsgi.py
from django.db.backends.signals import connection_created
from django.dispatch import receiver
@receiver(connection_created)
def setup_postgres(connection, **kwargs):
    if connection.vendor != 'postgresql':
        return

    # Timeout statements after 30 seconds.
    with connection.cursor() as cursor:
        cursor.execute("""
            SET statement_timeout TO 30000;
        """)
```

这样做使得超时设置只会影响工作进程，而不会影响统计查询与 cronjob。

同时，我们应该使用[持久化数据库连接][persitent database connection]，使得我们不需要为每一个请求付出建立数据库连接的代价。

边注：另一项非常耗时的操作是网络通讯，所以我们也应该在调用远程服务时设置超时：

```
import requests
response = requests.get(
    'https://api.slow-as-hell.com',
    timeout=3000,
)
```

# 限制

这一条建议同样与设置边界有关。有时候我们会希望用户输入一些数据，然后我们呈现出一份图表给他们。这一类的视图通常会在生产环境中产生一些奇怪的行为。

用户希望导出所有订单的情况并不罕见，当前标签页“卡住”时打开另一个标签页进行尝试也是很常见的情形。

这就是我们为什么要对查询做限制。

我们来试着做一个查询，返回不超过 100 行：

```python
# 一个错误的示范
data = list(Sale.objects.all())[:100]
```

这是一个错误的示范，程序将会把海量订单载入内存，然后截取前 100 项。

我们尝试改进一下：

```python
data = Sale.objects.all()[:100]
```

这个语句比之前的要好一些，Django 将会在查询中使用 limit 来获取前 100 行。

在这里遇到了另一个问题：当用户查询所有订单时，程序仍然会只返回 100 行数据。

我们继续改进之前的程序，当订单总数大于 100 时，抛出一个异常：

```python
LIMIT = 100
if Sales.objects.count() > LIMIT:
    raise ExceededLimit(LIMIT)
return Sale.objects.all()[:LIMIT]
```

这个片段能正常工作，但现在程序将会进行两次查询。

我们继续改进：

```python
LIMIT = 100
data = Sale.objects.all()[:(LIMIT + 1)]
if len(data) > LIMIT:
    raise ExceededLimit(LIMIT)
return data
```

我们现在获取前 101 行而不是 100 行，如果第 101 行数据存在，则我们知道数据总数大于 100。

LIMIT + 1 这个技巧很多时候非常使用。

# Select for update … of

我们将会用一个 bug 来开始这一小节。这个 bug 发生在半夜，根源是数据库锁，最后造成了查询超时。

一个常用的[进行交易的模式][transaction] 如下：

```python
from django.db import transaction as db_transaction
...
with db_transaction.atomic():
  transaction = (
        Transaction.objects
        .select_related(
            'user',
            'product',
            'product__category',
        )
        .select_for_update()
        .get(uid=uid)
  )
    ...
```

涉及到交易的操作通常包含 user 和 product，所以我们通常使用 [select_related][select_related] 来进行强制关联，减少查询次数。

到目前为止，问题还没有显现出来。

我们有一些 [ETL][ETL] 程序在半夜进行，维护 user 表和 product 表。这些 ETL 程序会执行更新和插入操作，所以他们也会请求获取锁。

所以问题的根源在于：当 [select_for_update][select_for_update] 和 select_related 一起使用的时候，Django 将会对本次查询涉及到对所有表加锁。

我们的程序尝试同时在 transaction, user, product 和 category 表上加锁，当 ETL 程序在半夜将后三个表加锁后，交易便失败了。

为了解决这个问题，[Django 2.0 中为 select_for_update 引入了一个新的参数][database api]：

```python
from django.db import transaction as db_transaction
...
with db_transaction.atomic():
  transaction = (
        Transaction.objects
        .select_related(
            'user',
            'product',
            'product__category',
        )
        .select_for_update(
            of=('self',)
        )
        .get(uid=uid)
  )
  ...
```

select_for_update 现在加入了 `of` 参数，使用 `of` 可以让我们明确指定对哪个表加锁。`self` 是一个特殊的关键字，表示我们想对当前 model 对应的表加锁（在我们的例子中，是 transaction）。

到目前为止，这个功能只可用于 PostgreSQL 和 Oracle。

# 外键索引

当创建一个 model 时，Django 将会在外键上自动创建一个 B-Tree 索引，B-Tree 索引会增加程序的负担，而且有时候索引并不是必要的。

一个经典的例子就是下面这用来存储成员关系的关系 model:

```
class Membership(Model):
    group = ForeignKey(Group)
    user = ForeignKey(User)
```

Django 将会隐式地为上面这个 model 创建两个索引，一个在 group 字段上，另一个在 user 字段上。

在关系 model 中，一个常用的模式是为两个字段添加唯一性约束。在我们的例子中表现为一个用户只能在同一个组中出现一次：

```
class Membership(Model):
    group = ForeignKey(Group)
    user = ForeignKey(User)
    class Meta:
        unique_together = (
           'group',
           'user',
        )
```

unique_together 也会创建一个索引，作用于这两个字段。所以我们这个 model 最终拥有 3 个 fiele 和 2 个索引。在很多情况下（取决于业务需求），我们可以解除掉外键索引，只保留唯一性约束创建的索引：

```
class Membership(Model):
    group = ForeignKey(Group)
    user = ForeignKey(User)
    class Meta:
        unique_together = (
           'group',
           'user',
        )
```

移除多余的索引可以加快插入和更新操作的速度，同时减轻了数据库的负载。

# 复合索引中列的顺序

在多个列上构建的索引被称为__复合索引__。在 B-Tree 复合索引中，第一列用树结构构建索引，第二列在第一层叶子节点的基础上构建树结构，然后依此类推。

__所以索引中列的顺序意义重大。__

在这个例子中，我们首先会构建一个树存储所有的组，然后对于每一个组构建一个树，存储它的所有组员。

对于 B-Tree 树来说，我们的经验法则是让第二层索引尽可能的小。换句话来说，基数更高的列（即不同的值更多）应该被放在前面。

在这个例子中，我们可以作出一个合理的假设，即认为用户比组多。所以将用户列放在前面可以使第二级索引为组而构建，使索引更小。

```
class Membership(Model):
    group = ForeignKey(Group, db_index=False)
    user = ForeignKey(User, db_index=False)
    class Meta:
        unique_together = (
            'user',
            'group',
        )
```

这只是一个经验之谈，所以你应该对此持保留态度。最终的索引需要根据具体的使用情景来进行优化。这一小节的重点是告诉你要__注意隐式索引，注意复合索引中列顺序的重大意义。__

# BRIN 索引

B-Tree 的结构就像一棵树一样。当随机访问数据表时，查询一个值的代价是使树的高度加 1。所以对于一致性约束和（某些）范围查询来说，B-Tree 索引是比较完美的。

__B-Tree 的缺点在于它的大小，它有时候会变得非常大。__

[PostgreSQL 提供了其它多种索引，供我们用于不同的场景。](https://medium.com/@Alibaba_Cloud/principles-and-applications-of-the-index-types-supported-by-postgresql-481f59bab67d)

Django 1.11 加入了一个新的 Meta 选项来控制索引，使得我们有机会去探索其它类型的索引。

PostgreSQL 提供了一种特别使用的索引：BRIN(Block Range Index)。在某些场景下 BRIN 索引会比 B-Tree 索引更加高效。

来看一下[官方文档](https://www.postgresql.org/docs/9.5/static/brin-intro.html) 中的说明：

> BRIN 主要针对于相对于其在表中的位置有自然关联性的列。

接下来我们简单介绍一下 BRIN 的内部机制。BRIN 将会基于表中的相邻数据块创建一个小型索引。这个索引占用的空间很小，它只能告诉你给定值__肯定不在某个区域__或者__可能在某个区域中__（区域被索引的情况下）。

我们用一个简单的实例来演示一下 BRIN。

假设一列中有如下值：

```
1, 2, 3, 4, 5, 6, 7, 8, 9
```

然后把相邻的 3 个放在一个区域内：

```
[1–3], [4–6], [7–9]
```

我们利用这个索引来搜索 5:

- `[1-3]` 肯定不在这个区域
- `[4-6]` 可能在这个区域
- `[7-9]` 肯定不在这个区域

利用这个索引我们把搜索范围缩小到了区域 4-6。

我们再看一下另一个例子，在这个例子中列中的值是乱序的：

```
[2,9,5], [1,4,7], [3,8,6]
```

然后用每个区域中的最大值和最小值生成索引：

```
[2–9], [1–7], [3–8]
```

接下来尝试去查找 5:

- `[2-9]` 可能在这个区域中
- `[1-7]` 可能在这个区域中
- `[3-8]` 可能在这个区域中

这个索引不仅没有缩小搜索的范围，同时还导致我们需要将索引和整个表的值一起读入。所以它起不到任何有效作用。

让我们再回到文档：

> ... 与其在表中的物理位置有自然关联的列

这是使用 BRIN 索引的关键。想要发挥出 BRIN 索引的作用，列中的值从整体来看应该有序或有聚集性地排列在硬盘上。

回到 Django 中，[auto_now_add][auto_now_add] 列就是一个非常契合这个条件的场景，我们经常需要对 auto_now_add 列建立索引，同时它也基本上是自然有序地被存放在硬盘上。

如下面这个 model:

```
class SomeModel(Model):
    created = DatetimeField(
        auto_now_add=True,
    )
```

当一行数据被创建时，Django 将会自动在 created 列插入当前时间。由于 created 列也经常被用在查询条件中，所以我们经常需要在上面建立索引：

```
from django.contrib.postgres.indexes import BrinIndex
class SomeModel(Model):
    created = DatetimeField(
        auto_now_add=True,
    )
    class Meta:
        indexes = (
            BrinIndex(fields=['created']),
        )
```

为了给大家一个直观的感受，我在表中创建列 200 万行数据，然后建立不同的索引：

- B-Tree 索引：37 MB
- BRIN 索引：49 KB

两者所占空间相差了 700 多倍。

虽然说在创建索引时，硬盘空间消耗并不是我们考虑的唯一因素。但是一般而言，我们可以在 Django 1.11 中使用新的索引支持，使查询更轻量，更快。

[medium]: https://medium.com/
[source]: https://medium.com/@hakibenita/9-django-tips-for-working-with-databases-beba787ed7d3
[author]: https://medium.com/@hakibenita
[condition]: https://docs.djangoproject.com/en/2.0/ref/models/conditional-expressions/
[named]: https://docs.djangoproject.com/en/2.0/ref/models/querysets/#django.db.models.query.QuerySet.values_list

[aggregate functions]: https://www.postgresql.org/docs/9.5/static/functions-aggregate.html
[data types]: https://www.postgresql.org/docs/9.5/static/datatype.html

[custom function]: https://docs.djangoproject.com/en/2.0/ref/models/expressions/#func-expressions
[f expression]: https://docs.djangoproject.com/en/2.0/ref/models/expressions/#f-expressions

[set sql timeout]: https://www.postgresql.org/docs/9.6/static/runtime-config-client.html#GUC-STATEMENT-TIMEOUT
[persitent database connection]: https://docs.djangoproject.com/en/2.0/ref/databases/#persistent-connections

[transaction]: https://medium.com/p/bullet-proofing-django-models-c080739be4e
[select_related]: https://docs.djangoproject.com/en/2.0/ref/models/querysets/#select-related
[ETL]: https://en.wikipedia.org/wiki/Extract,_transform,_load
[select_for_update]: https://docs.djangoproject.com/en/2.0/ref/models/querysets/#select-for-update
[database api]: https://docs.djangoproject.com/en/2.0/releases/2.0/#database-backend-api

[auto_now_add]: https://docs.djangoproject.com/en/2.0/ref/models/fields/#datefield
