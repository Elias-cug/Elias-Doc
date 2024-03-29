# CSS

## css浮动
> 浮动的框可以向左或向右移动，直到它的外边缘碰到包含框或另一个浮动框的边框为止。由于浮动框不在文档的普通流中，所以文档的普通流中的边框表现得就像浮动框不存在一样。

**元素怎样浮动**
1. 元素的水平方向浮动，意味着元素只能**左右移动**而不能上下移动。
2. 一个浮动元素会尽量向左或向右移动，直到它的外边缘碰到包含框或另一个浮动的边框为止，
3. 浮动元素之后的元素将围绕它
4. 浮动元素之前的元素将不会受影响
5. 如果图像是右浮动，文本将环绕在它左边
6. 如果包含框太窄，无法容纳水平排列的三个浮动元素，那么其它浮动块向下移动，直到有足够的空间。如果浮动元素的高度不同，那么当它们向下移动时可能被其它浮动元素“卡住”

**怎么清除浮动**
> clear指定不允许元素周围有浮动元素
1. 给浮动的元素的祖先元素加上高度 --》浮动的元素不会自动撑开父元素的高度
2. clear: both;  clear就是清除，both会将左右浮动都清除，但是会使margin失效
3. overflow: hidden; BFC 
4. 使用额外的元素分割；

**浮动作用**
1. 文字环绕

## BFC 
> BFC即块级格式上下文。它是一个独立的渲染区域，只有Block-level box 参与，它规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干。

1. 页面由多个 box 组成
2. 元素类型和display属性，决定box的类型。
3. 不同类型的box，会参与不同的formatting context 
4. 盒子类型：
  - block-level box; display 属性为block， list-item，table， 的元素。参与BFC
  - inline-level box; dispaly 属性为inline, inline-block, inline-table 的元素。参与IFC
  - run-in box 

5. BFC 布局规则
  - 内部的box会在垂直方向，一个接一个地放置。
  - box垂直方向的距离由 margin 决定。属于同一个BFC的相邻Box的margin会发生重叠。
  - 每个盒子（块盒与行盒）的margin box 的左边，与包含块border box的左边相接触。即使存在浮动也如此。
  - BFC的区域不会与float box重叠
  - BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素
  - 计算BFC的高度时，浮动元素也参与计算。 --》清除浮动

6. 如何创建BFC
  - float的值不是none 
  - position的值不是static或relative 
  - display的值时inline-block，table-cell，flex，table-caption或inline-flex
  - overflow的值不是visible 

7. BFC 作用
  - 避免margin重叠
  - 自适应俩栏布局
  - 父元素计算高度时包含浮动元素

## 重绘 重排
1. 重绘 --》非布局型样式
2. 重排因素
   * 浏览器第一次加载
   * 浏览器窗口大小改变
   * 元素尺寸或位置发生改变
   * 元素字体发生改变
   * 添加或删除可见的 dom 元素
   * 激活 css 伪类
   * client系列的属性 offset系类属性 scroll系列属性 
3. 怎么避免重排
   * 避免使用 table 布局
   * 动画效果应用到 position 为 absolute 或 fixed 的属性上
   * 避免使用 css 表达式

   * 一次性重写 style 属性
   * 使用 documentFragment 一次性添加多个 dom 元素
   * 避免频繁使用引发回流的属性
   * 动画使用绝对定位脱离文档流

## border-box content-box
1. border-box padding border 的width height计算在内
2. content-box padding border 的width height计算在内

## opacity visibility display: none
1. display: none --》会改变页面布局
  - 元素彻底消失，脱离文档流
  - 子元素跟随父元素被隐藏，并且无法单独显示
  - 绑定的事件也无法触发
  - dom节点还是存在，仍旧可以用 js 操作

2. opacity: 0 --》该方法不会改变页面布局
  - 实际上是元素的透明度为 0 
  - 子元素 opacity：1 是无效的，元素仍旧无法显示
  - 绑定的事件仍然可以触发

3. visibility：hidden --》该方法不会改变页面的布局
  - 使元素不可见
  - 子元素设置 visibility: visible，子元素会显示，但父元素不会显示
  - 绑定的事件不能触发

4. 补充
  - display: none 给图片设置会加载，但不会显示。父元素也是如此
  - visibility: hidden 同上
  - opacity: 0 同上

## z-index失效的原因
1. 父标签 position 值为 relative
2. 问题标签无 position 属性
3. 问题标签含有浮动属性
4. 问题标签的祖先标签 z-index 值比较小

## flex 布局 
```css 
div {
  display: flex;
  flex-directive: row | row-reverse | column | column-reverse;
  flex-wrap: nowrap | wrap | wrap-reverse;
  flex-flow:  <flex-direction> || <flex-wrap>;
  justify-content: flex-start | flex-end | center | space-between | space-around;
  align-items: flex-start | flex-end | center | baseline | stretch;
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
  div {
    order: <integer>;
    flex-grow: <number>; /* default 0 */
    flex-shrink: <number>; /* default 1 */
    flex-basis: <length> | auto; /* default auto */
    align-self: auto | flex-start | flex-end | center | baseline | stretch;
  }
}
```

## 媒体查询相关
1. viewport
  - width=device-width 
  - height=device-height 
  - initial-scale 
  - maximum-scale 
  - minimum-scale 
  - user-scaleable

2. @meida
  - 媒体设备 all/screen/print/speech 
  - style link @import 根据媒体引入
  - orientation
  - not only
  - width height
  - max-width max-height min-width min-height
  - device-aspect-ratio max-device-aspect-ratio

## css预编译框架
**less** 
1. 变量：@
2. 混合mixins
3. 嵌套
4. 导入：@import
5. 函数

**sass**
1. 变量：$
2. 嵌套
3. 父选择器的标识符&
4. 导入：@import
5. 静默注释
6. 混合器：声明@mixin 引入@include
7. 混合器传参
8. 函数：@function

## 其他
1. background-size 
```css
background-size：contain; // 缩小图片来适应元素的尺寸（保持像素的长宽比），是图片宽高最长的那个边覆盖元素一边即可；
background-size ：cover; // 扩展图片来填满元素（保持像素的长宽比），是图片宽高最短的那个边覆盖元素一边即可；
background-size ：100px 100px; // 调整图片到指定大小；
background-size ：50% 100%; // 调整图片到指定大小，百分比相对于包含元素的尺寸（并且并不需要包含元素显示设置宽高）
```
2. 有全背景的页面布局方案
- background-size：设置cover 
- height: 100vh
- 设置overflow: auto
- 内部元素设置固定宽高，保证交互元素友好展示
- 根据屏幕分辨率使用@media根据实际情况再做调整

3. 使用`import { css } from '@emotion/react'`可以做mixin，如下：
```js
const handleIcon = css`
  .handle-icon {
    ${tw`absolute flex items-center`};
    top: -34px;
    right: 20px;
    img {
      width: 12px;
      height: 12px;
      margin-left: 6px;
    }
  }
`
const Select = styled.div`
  ${handleIcon}
`
```
4. z-index失效，添加如下代码
```js 
posiiton: relative;
```

5. 字体渐变色
```css
{
  background: linear-gradient(to bottom, #DF94FF, #D167FF);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
```

6. nth-child 
```css
nth-child(odd){
  /* 奇数个 */
}
nth-child(enev){
  /* 偶数个 */
}

nth-child(-m+n) {
  /* 选择前 m 个 */
}

nth-child(m+n) {
  /* 选择后 m 个 */
}

```

7. css选择器
  - > 子元素（不包括后代元素）
  - & 父级元素 

8. 小程序不识别 * 号选择器

9. box-shadow: inset 0 0 15px 0 rgba(50,84,252,0.39);

10. border-image: linear-gradient(to right, #3AF2FF,  #41B4FF, #014D92) 1;

11. before after 是标签内内容的前后，非标签前后

12. 做渐变border
```js 
ackground-clip
background-origin
background-image
```

13. text-align失效：配合justity-end justify-start使用