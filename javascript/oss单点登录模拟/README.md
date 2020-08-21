# README

> 参考资料：
>
> - [不务正业的前端之SSO（单点登录）实践](https://juejin.im/post/6844903641506119687)
> - [基于node.js实现简单的单点登录功能](https://blog.csdn.net/u014298440/article/details/80706777?utm_source=blogxgwz8)

技术栈：

- express
- nginx

测试需要使用 nginx 配合 host 文件修改域名

host 文件如下

```ini
127.0.0.1 testOssA.com
127.0.0.1 testOssB.com
127.0.0.1 testOssAuth.com
```

nginx 配置文件如下

```conf
server {
  listen 80;
  server_name testOssA.com;
  server_tokens off;

  client_max_body_size 100m;

  access_log  /var/log/nginx/test_oss_A_access.log;
  error_log   /var/log/nginx/test_oss_A_error.log;

  proxy_set_header        Host            $host;
  proxy_set_header        X-Real-IP       $remote_addr;
  proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
  #proxy_set_header Authorization $COOKIE_Authorization;

  proxy_ignore_client_abort on;
  location / {
    proxy_pass http://host_ip:3001;
  }

}

server {
  listen 80;
  server_name testOssB.com;
  server_tokens off;

  client_max_body_size 100m;

  access_log  /var/log/nginx/test_oss_A_access.log;
  error_log   /var/log/nginx/test_oss_A_error.log;

  proxy_set_header        Host            $host;
  proxy_set_header        X-Real-IP       $remote_addr;
  proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
  #proxy_set_header Authorization $COOKIE_Authorization;

  proxy_ignore_client_abort on;
  location / {
    proxy_pass http://host_ip:3001;
  }

}

server {
  listen 80;
  server_name testOssAuth.com;
  server_tokens off;

  client_max_body_size 100m;

  access_log  /var/log/nginx/test_oss_B_access.log;
  error_log   /var/log/nginx/test_oss_B_error.log;

  proxy_set_header        Host            $host;
  proxy_set_header        X-Real-IP       $remote_addr;
  proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
  #proxy_set_header Authorization $COOKIE_Authorization;

  proxy_ignore_client_abort on;
  location / {
    proxy_pass http://host_ip:3000;
  }

}
```

nginx 相关命令

```shell
# 启动 nginx
nginx -c /etc/nginx/nginx.conf
# 检查 nginx 配置文件语法
nginx -t
# 重启 nginx
nginx -s reload
```

整体流程图片：

![流程图片-1](https://user-gold-cdn.xitu.io/2018/7/20/164b8321d97c203c?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

![流程图片-2](https://img-blog.csdn.net/20180615153643587?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTQyOTg0NDA=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)
