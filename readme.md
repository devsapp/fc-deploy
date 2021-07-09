## 指令帮助

该指令有 sdk 模式和 pulumi 模式，通过下述指令来进行切换，默认是 sdk 模式:

```shell
s cli fc-default set deploy-type pulumi
s cli fc-default set deploy-type sdk
```

部署时可通过 ```--use-local``` 来默认使用线下配置进行部署，此时不会出现交互式选择。

```shell
# 部署资源
$ s exec -- deploy -y --use-local

# 删除资源
$ s exec -- remove service
$ s exec -- remove function
$ s exec -- remove trigger [-n name]
```
