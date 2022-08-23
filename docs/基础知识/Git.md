# Git

## 常用命令
1. git config
修改全局配置等
```shell 
git config -global user.name "liyish"
git config -global user.email "liyish@163.com"
```

2. git init
创建一个新的代码库

3. git clone url
通过指定URL获取一个代码库

4. git add [file]
将文件添加至暂存区

5. git commit 
该命令可以在版本历史记录中永久记录文件
```shell
git commit -m 'feat: 提交描述'
```

6. git commit -a 
该命令将提交git add 命令添加的所有文件，并提交git add命令之后更改的所有文件
```shell

```