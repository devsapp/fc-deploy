## 指令帮助

该指令有 sdk 模式和 pulumi 模式，通过下述指令来进行切换，默认是 sdk 模式:

```shell
s cli fc-default set deploy-type pulumi
s cli fc-default set deploy-type sdk
```

部署时可通过 ```--use-remote``` 来决定是否利用线上配置，默认使用线下配置。

```shell
# 部署资源，不加 --use-remote 则默认用线下配置
$ s exec -- deploy -y --use-remote

# 删除资源
$ s exec -- remove service
$ s exec -- remove function
$ s exec -- remove trigger [-n name]
```
