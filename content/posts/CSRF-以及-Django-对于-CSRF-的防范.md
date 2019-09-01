---
title: CSRF 以及 Django 对于 CSRF 的防范
date: 2017-12-29 23:51:53
tags:
- web
- security
- django
---
[Cross-site Request Forgery][csrf] 简称 CSRF 或 one-click attack, 是指未经授权 (authorization) 的指令从用户的浏览器发送到了服务器。不同于 [XSS(Cross-Site Scripting)][xss] 的是，CSRF 不需要向被服务器信任的页面注入代码。它利用互联网的开放性，从未被信任的页面向服务器发送请求。
<!--more-->

# 一个简单的 CSRF 示例

假设一个网站用 GET 请求来删除用户数据，如 /delete_my_data。当用户点击页面上的这个链接时，请求携带着用户的 cookie 通过了网站的验证并成功删除了用户的数据。

当攻击者想要发起攻击时，只需要让用户加载这个 URL 就好了。不过仅仅在页面中写一个链接可能并不起作用，因为用户不一定会点击这个链接，但我们可以通过一张图片链接达成我们的目标：

`<img src="http://application.com/delete_my_items" />`

只要在页面中包含这个图片链接，或者通过 email 发送这个图片链接，我们的攻击就奏效了。

# 工作原理

图片等资源链接的加载不受 hostname 的限制，所以我们从包含恶意链接的页面向目标服务器请求图片一般情况下是可行的。而由于请求是由用户的浏览器发出的，请求将会携带 application.com 的 cookie，使得用户可以通过权限认证，最终使我们的攻击达到了目的。

CSRF 的关键点就是欺骗浏览器，使其发送一个不符合用户本意的 HTTP 请求。所以我们的攻击不需要偷取用户的认证信息。这也就是为什么某些银行网站会在用户 2 分钟内无操作后将用户登出，或者用一次性令牌来保证转账的安全性。

# 实施 CSRF 的前提

需要说明的是，只有当以下几点条件__同时__成立时 CSRF 才能奏效：

- 被攻击的服务器不检查 [Referer HTTP header][referer header], 致使接受了外部页面发来的请求。
- 用户的表单提交会造成服务器的数据变更，或是某个 URL 有副作用 (side effects)。
- 攻击者可以明确请求中所需的数据。比如在一些非常简陋的网站中，权限认证仅仅通过 cookie 进行，使攻击者只需要在请求中填写不敏感的数据。
- 用户必须加载包含攻击代码的恶意页面。

# 防护 CSRF 的对策

首先，不要使用 GET 进行任何有[副作用][safe methods] 的操作。

但是，仅仅使用 POST 是不够的，攻击者可以通过 JavaScript 使得页面在加载时提交一个表单，制造一个虚假的 POST 请求。

以下介绍几条防范 CSRF 的对策：

## 使用 Referer HTTP header

通过检查 Referer HTTP header 可以很轻松的验证请求是否是由我们的 web 应用内部的页面发送的。虽然 Referer 可以被恶意的 user agent 很容易地欺骗，但是对于普通用户使用的常规浏览器，并不会遇到恶意 user agent。

这个方法同时假设恶意的 HTML/JavaScript 不回被注入你自己的页面。否则的话，referer 将会是正确的。

这个方法存在的问题是 referer stripping 是很常见的，[有高达 11% 的 HTTP 请求不包含 referrer][robust defenses of csrf]。所以，严格的 referer 检查会导致你的应用的十分之一的用户无法发送 POST 请求。

同时，在 POST 请求中用 origin header 来代替 referer header 可以更好地保护用户地隐私。

## Session token

这个解决方法采用的是一次性口令的思路，token 被存放在用户的 session 里，用户的每一次表单提交都需要携带 token。

在具体实施时，可以将 token 放到表单的一个隐藏字段中。如果攻击者想要发送请求，他必须获取到特定的 token，但是由于 JavaScript 不能读取外部页面的表单，攻击将无法进行。

## Double-submitted cookie

这是前一种方案的改进，思路是将表单携带的 token 和 cookie 相匹配，而不是和 session 中的值。

由于 [same origin policy][same origin policy]，JavaScript 代码不能获取官方站点的 cookie，所以当官方表单将 cookie 中的值放入表单中一起发送时，攻击者需要去猜测这个值并放入请求中。如果这个值足够长，那么攻击者几乎不可能猜到它。

这个方案的优点在于减少了服务器的资源占用。

# Django 对于 CSRF 的防范

Django 中的 CsrfViewMiddleware 可以帮助我们防范 CSRF

## 工作机制

1. 使用 [django.middleware.csrf.get_token()][get_token] 来生成 token。

    ```python
    def get_token(request):
        """
        Return the CSRF token required for a POST form. The token is an
        alphanumeric value. A new token is created if one is not already set.
        A side effect of calling this function is to make the csrf_protect
        decorator and the CsrfViewMiddleware add a CSRF cookie and a 'Vary: Cookie'
        header to the outgoing response.  For this reason, you may need to use this
        function lazily, as is done by the csrf context processor.
        """
        if "CSRF_COOKIE" not in request.META:
            # 对于 header 中不包含 CSRF_COOKIE 的请求，我们会生成一个新的 csrf_secret 并为其加盐
            csrf_secret = _get_new_csrf_string()
            request.META["CSRF_COOKIE"] = _salt_cipher_secret(csrf_secret)
        else:
            # 对于 header 中已经包含 CSRF_COOKIE 的请求，我们则会取出它
            csrf_secret = _unsalt_cipher_token(request.META["CSRF_COOKIE"])
        request.meta["csrf_cookie_used"] = true
        # 最后，为 csrf_secret 重新加盐
        return _salt_cipher_secret(csrf_secret)
    ```

    _get_new_csrf_string:

    ```python
    def _get_new_csrf_string():
        return get_random_string(CSRF_SECRET_LENGTH, allowed_chars=CSRF_ALLOWED_CHARS)
    ```

    这个函数使用 django 自带的 get_random_string 方法生成一个随机的字符串做为 csrf_string （默认长度为 32, 默认包含字母和数字）

    django.utils.crypto.get_random_string:

    ```python
    def get_random_string(length=12,
                          allowed_chars='abcdefghijklmnopqrstuvwxyz'
                                        'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'):
        """
        Return a securely generated random string.
        The default length of 12 with the a-z, A-Z, 0-9 character set returns
        a 71-bit value. log_2((26+26+10)^12) =~ 71 bits
        """
        if not using_sysrandom:
            # This is ugly, and a hack, but it makes things better than
            # the alternative of predictability. This re-seeds the PRNG
            # using a value that is hard for an attacker to predict, every
            # time a random string is required. This may change the
            # properties of the chosen random sequence slightly, but this
            # is better than absolute predictability.
            random.seed(
                hashlib.sha256(
                    ('%s%s%s' % (random.getstate(), time.time(), settings.SECRET_KEY)).encode()
                ).digest()
            )
        return ''.join(random.choice(allowed_chars) for i in range(length))
    ```

    在用 _get_new_csrf_string 取得一个随机字符串后，用 _salt_cipher_secret 对其进行加盐：

    ```python
    def _salt_cipher_secret(secret):
        """
        Given a secret (assumed to be a string of CSRF_ALLOWED_CHARS), generate a
        token by adding a salt and using it to encrypt the secret.
        """
        salt = _get_new_csrf_string()
        chars = CSRF_ALLOWED_CHARS
        pairs = zip((chars.index(x) for x in secret), (chars.index(x) for x in salt))
        cipher = ''.join(chars[(x + y) % len(chars)] for x, y in pairs)
        return salt + cipher
    ```

    加盐的流程是

    1. 取得一个新的 csrf_string, 和传进来的 csrf_string 相加（即同位相加，超出取余），得到 cipher

    2. 拼接 salt 和 cipher，得到我们最终需要的 csrf_token

1. Django 发送出去的 POST 表单都会携带一个 csrfmiddlewaretoken 字段。

1. 对于没有以 [safe methods][safe methods standard] 发送的请求 (POST，PUT,DELETE), 必须携带 CSRF cookie, 即 csrfmiddlewaretoken 字段必须存在且正确。否则用户将会接收到 403 响应。

未完待续

# 参考

- [Cross-site request Forgery wiki](https://en.wikipedia.org/wiki/Cross-site_request_forgery)
- [Cross-Site Request Forgery explained](https://dzone.com/articles/cross-site-request-forgery)
- [Django Cross Site Request Forgery protection](https://docs.djangoproject.com/en/1.11/ref/csrf/)
- [Authentication - Django REST framework](http://www.django-rest-framework.org/api-guide/authentication/#api-reference)

[csrf]: https://en.wikipedia.org/wiki/Cross-site_request_forgery
[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting
[referer header]: https://en.wikipedia.org/wiki/HTTP_referer
[safe methods]: https://tools.ietf.org/html/rfc7231.html#section-4.2.1
[robust defenses of csrf]: http://www.adambarth.com/papers/2008/barth-jackson-mitchell-b.pdf
[same origin policy]: https://en.wikipedia.org/wiki/Same-origin_policy
[get_token]: https://github.com/django/django/blob/master/django/middleware/csrf.py#L74
[safe methods standard]: https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9.1.1
