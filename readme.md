## 指令帮助

```shell
# 部署资源，不加 --use-remote 则默认用线下配置
$ s exec -- deploy -y --use-remote

# 删除资源
$ s exec -- remove service
$ s exec -- remove function
$ s exec -- remove trigger [-n name]
```
