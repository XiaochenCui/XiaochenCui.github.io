---
title: mysql 日志配置
date: 2018-01-03 19:45:12
tags:
- mysql
---
# 概览

本文主要讲解 mysql 的日志配置，以及介绍 mysql5.7 对于慢查询配置项的更新

# 日志分类

我们将开启以下三种日志：

- **错误日志**：包含 mysql 启动时 / 运行时 / 停止时发生的错误
- **普通日志**：包含 mysql 客户端连接 / 断开连接 / 执行查询操作的信息
- **慢查询日志**：包含造成慢查询的 SQL 语句

我们不会开启 [Binary Log][binary-log], 因为它对服务器的硬件有很高要求，很影响数据库的性能，而且只在某些特点情况下有用（如：建立复制集，建立主 - 从模式，执行一些特殊的数据恢复操作等）。
<!--more-->

# 实施

## 通过更改配置文件启用日志

这种方式需要重启服务器使变更生效，日志参数一般在 [mysqld] 部分进行配置。

打开 mysql 配置文件 my.cnf （在不同的发行版下位置不同，一般在 /etc 或者 /etc/mysql)

### 错误日志

打开 /etc/mysql/conf.d/mysqld_safe_syslog.cnf, 编辑为：

```
[mysqld_safe]
syslog
```

这是我们推荐的设置，将会使错误日志进入 syslog。如果不想让错误日志进入 syslog，可以注释或删除掉这一行，然后在 my.cnf 文件中新增下列配置项：

```
[mysqld_safe]
log_error=/var/log/mysql/mysql_error.log

[mysqld]
log_error=/var/log/mysql/mysql_error.log
```

### 普通日志

在 [mysqld] 在添加下面几行（或者把注释取消掉）：

```
general_log_file        = /var/log/mysql/mysql.log
general_log             = 1
```

### 慢查询日志

在 [mysqld] 下添加以下配置（或者把注释取消掉）：

```
slow_query_log = 1
slow_query_log_file = /var/log/mysql/mysql-slow.log
long_query_time = 2
log-queries-not-using-indexes
```

### 重启服务器

在更新配置后需要重启服务器：

- upstart:
 `$ service mysql restart`
- systemd:
 `$ systemctl restart mysql.service`

## 在运行中启用日志

从 mysql5.1 开始，日志可以在运行中启用

登录 mysql clinet, 在 在运行中启用日志：

```
SET GLOBAL general_log = 'ON';
SET GLOBAL slow_query_log = 'ON';
```

在运行中禁用日志：

```
SET GLOBAL general_log = 'OFF';
SET GLOBAL slow_query_log = 'OFF';
```

## 日志轮转

为了防止日志文件过大，我们还需要启用日志轮转

### Ubuntu

打开 `/etc/logrotate.d/mysql-server`, 加入以下配置：

```
# - I put everything in one block and added sharedscripts, so that mysql gets
#   flush-logs'd only once.
#   Else the binary logs would automatically increase by n times every day.
# - The error log is obsolete, messages go to syslog now.
/var/log/mysql.log /var/log/mysql/*log {
        daily
        rotate 7
        missingok
        create 640 mysql adm
        compress
        sharedscripts
        postrotate
                test -x /usr/bin/mysqladmin || exit 0
                # If this fails, check debian.conf!
                MYADMIN="/usr/bin/mysqladmin --defaults-file=/etc/mysql/debian.cnf"
                if [ -z "`$MYADMIN ping 2>/dev/null`" ]; then
                  # Really no mysqld or rather a missing debian-sys-maint user?
                  # If this occurs and is not a error please report a bug.
                  #if ps cax | grep -q mysqld; then
                  if killall -q -s0 -umysql mysqld; then
                    exit 1
                  fi
                else
                  $MYADMIN flush-logs
                fi
        endscript
}
```

### CentOS

打开 `/etc/logrotate.d/mysql`, 加入以下配置：

```
# The log file name and location can be set in
# /etc/my.cnf by setting the "log-error" option
# in [mysqld]  section as follows:
#
# [mysqld]
# log-error=/var/log/mysqld.log
#
# For the mysqladmin commands below to work, root account
# password is required. Use mysql_config_editor(1) to store
# authentication credentials in the encrypted login path file
# ~/.mylogin.cnf
#
# Example usage:
#
#  mysql_config_editor set --login-path=client --user=root --host=localhost --password
#
# When these actions has been done, un-comment the following to
# enable rotation of mysqld's log error.
#

/var/log/mysqld.log {
        create 640 mysql mysql
        notifempty
        daily
        rotate 5
        missingok
        compress
    postrotate
       # just if mysqld is really running
       if test -x /usr/bin/mysqladmin && \
          /usr/bin/mysqladmin ping &>/dev/null
       then
          /usr/bin/mysqladmin flush-logs
       fi
    endscript
}
```

## 检查日志配置

用 `show variables like '%log%';` 检查日志配置项：

```
mysql> show variables like '%log%';
+-----------------------------------------+-------------------------------------------+
| Variable_name                           | Value                                     |
+-----------------------------------------+-------------------------------------------+
| back_log                                | 80                                        |
| binlog_cache_size                       | 32768                                     |
| binlog_checksum                         | CRC32                                     |
| binlog_direct_non_transactional_updates | OFF                                       |
| binlog_error_action                     | ABORT_SERVER                              |
| binlog_format                           | ROW                                       |
| binlog_group_commit_sync_delay          | 0                                         |
| binlog_group_commit_sync_no_delay_count | 0                                         |
| binlog_gtid_simple_recovery             | ON                                        |
| binlog_max_flush_queue_time             | 0                                         |
| binlog_order_commits                    | ON                                        |
| binlog_row_image                        | FULL                                      |
| binlog_rows_query_log_events            | OFF                                       |
| binlog_stmt_cache_size                  | 32768                                     |
| expire_logs_days                        | 10                                        |
| general_log                             | ON                                        |
| general_log_file                        | /var/log/mysql/mysql.log                  |
| innodb_api_enable_binlog                | OFF                                       |
| innodb_flush_log_at_timeout             | 1                                         |
| innodb_flush_log_at_trx_commit          | 1                                         |
| innodb_locks_unsafe_for_binlog          | OFF                                       |
| innodb_log_buffer_size                  | 16777216                                  |
| innodb_log_checksums                    | ON                                        |
| innodb_log_compressed_pages             | ON                                        |
| innodb_log_file_size                    | 50331648                                  |
| innodb_log_files_in_group               | 2                                         |
| innodb_log_group_home_dir               | ./                                        |
| innodb_log_write_ahead_size             | 8192                                      |
| innodb_max_undo_log_size                | 1073741824                                |
| innodb_online_alter_log_max_size        | 134217728                                 |
| innodb_undo_log_truncate                | OFF                                       |
| innodb_undo_logs                        | 128                                       |
| log_bin                                 | OFF                                       |
| log_bin_basename                        |                                           |
| log_bin_index                           |                                           |
| log_bin_trust_function_creators         | OFF                                       |
| log_bin_use_v1_row_events               | OFF                                       |
| log_builtin_as_identified_by_password   | OFF                                       |
| log_error                               | /var/log/mysql/error.log                  |
| log_error_verbosity                     | 3                                         |
| log_output                              | FILE                                      |
| log_queries_not_using_indexes           | ON                                        |
| log_slave_updates                       | OFF                                       |
| log_slow_admin_statements               | OFF                                       |
| log_slow_slave_statements               | OFF                                       |
| log_statements_unsafe_for_binlog        | ON                                        |
| log_syslog                              | OFF                                       |
| log_syslog_facility                     | daemon                                    |
| log_syslog_include_pid                  | ON                                        |
| log_syslog_tag                          |                                           |
| log_throttle_queries_not_using_indexes  | 0                                         |
| log_timestamps                          | UTC                                       |
| log_warnings                            | 2                                         |
| max_binlog_cache_size                   | 18446744073709547520                      |
| max_binlog_size                         | 104857600                                 |
| max_binlog_stmt_cache_size              | 18446744073709547520                      |
| max_relay_log_size                      | 0                                         |
| relay_log                               |                                           |
| relay_log_basename                      | /var/lib/mysql/zcheng2115-relay-bin       |
| relay_log_index                         | /var/lib/mysql/zcheng2115-relay-bin.index |
| relay_log_info_file                     | relay-log.info                            |
| relay_log_info_repository               | FILE                                      |
| relay_log_purge                         | ON                                        |
| relay_log_recovery                      | OFF                                       |
| relay_log_space_limit                   | 0                                         |
| slow_query_log                          | ON                                        |
| slow_query_log_file                     | /var/log/mysql/mysql-slow.log             |
| sql_log_bin                             | ON                                        |
| sql_log_off                             | OFF                                       |
| sync_binlog                             | 1                                         |
| sync_relay_log                          | 10000                                     |
| sync_relay_log_info                     | 10000                                     |
+-----------------------------------------+-------------------------------------------+
72 rows in set (0.00 sec)
```

## 慢查询变量的更新

某些文章中介绍的启用慢查询日志的配置项为 `log-slow-queries`, [在 mysql 5.5 中，这个配置项已经被弃用][slow-query-log]

# 参考

- [How and When To Enable MySQL Logs](http://www.pontikis.net/blog/how-and-when-to-enable-mysql-logs)
- [MySQL :: MySQL 5.7 Reference Manual :: 5.4 MySQL Server Logs](https://dev.mysql.com/doc/refman/5.7/en/server-logs.html)
- [MySQL :: MySQL 5.7 Reference Manual :: 5.4.5 The Slow Query Log](https://dev.mysql.com/doc/refman/5.7/en/slow-query-log.html)
- [MySQL :: MySQL 5.7 Reference Manual :: 5.4.4 The Binary Log][binary-log]
- [my.cnf - mysql 5.7 log-slow-queries error - Stack Overflow](https://stackoverflow.com/questions/36893799/mysql-5-7-log-slow-queries-error)

[binary-log]: https://dev.mysql.com/doc/refman/5.7/en/binary-log.html
[slow-query-log]: https://dev.mysql.com/doc/refman/5.5/en/slow-query-log.html
