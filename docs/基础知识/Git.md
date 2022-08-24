# Git

## 常用命令
1. git config
修改全局配置等
```shell 
git config --global user.name "liyish"
git config --global user.email "liyish@163.com"
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
git commit -a -m 'feat: 提交描述'
```

7. git diff 
```shell 
# 显示尚未添加到stage的文件的变更
git diff

# 显示添加到stage的文件与当前最新版本之间的差异
git diff --staged

# 显示两个分支之间的差异
git diff branch1 branch2

```

8. git reset 
```shell
# 从stage中撤出指定文件，可以保留文件内容
git reset [file]

# 撤销指定提交之后的所有提交，并在本地保留变更
git reset [commit]

# 丢弃所有的历史记录，并回滚到指定提交
git reset --hard [commit]
```

9. git status
显示所有要提交的文件

10. git rm
删除工作目录中的文件，并将删除动作添加到stage
```shell
git rm [file]
```

11. git log 
```shell
# 该命令用于显示某个文件的版本历史记录，包括文件的重命名
git log --follow [file]
```

12. git show 
```shell
# 该命令显示指定提交的元数据以及内容变更
git show [commit]
```

13. git tag 
```shell
# 该命令可以给指定的提交添加标签
git tag [commitID]
```

14. git branch  / git branch -d

15. git checkout 

16. git merge 

17. git remote
```shell
# 可以通过该命令将本地代码库链接到远程服务器
git remote add origin url
```

18. git push

19. git pull 
```shell
# 该命令将获取远程服务器上的变更，并合并到工作目录
git pull
```

20. git stash
```shell
# 该命令将保存所有修改的文件
git stash save

# 该命令将恢复最近一次促藏的文件
git stash pop

# 该命令将显示stash的所有变更
git stash list

# 该命令将丢弃最近一次stash的变更
git stash drop
```

21. git rebase 
- 多次提交合并为一次提交
```shell
# 该命令将最近三次提交合并为一次提交
git rebase -i HEAD~3
```

- 合并分支
通过git rebase 合并的分支在删除分支后，只保留一条纯粹的合并线。

```shell 

```

