# jsonApi -->完成
1. 查询
 - 查一条
 - 查count
 - 查分组count
 - join查

# 在Flex布局中左侧固定，右侧自适应的方法如下：

1、首先要在父容器上设置display: flex;

2、然后在左侧元素上设置width，并设置flex-shrink: 0; 以防止其缩小

3、在右侧元素上设置flex-grow: 1; 以便其随着父容器的宽度而增加

代码示例：

.container { display: flex; }

.left-side { width: 200px; flex-shrink: 0; }

.right-side { flex-grow: 1; }

