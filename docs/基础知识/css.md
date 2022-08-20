# CSS

## 怎么清除浮动
1. 给浮动的元素的祖先元素加上高度 --》浮动的元素不会自动撑开父元素的高度
2. clear: both;  clear就是清除，both会将左右浮动都清除，但是会使margin失效
3. overflow: hidden; BFC 
4. 使用额外的元素分割；