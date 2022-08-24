# CSS

## 怎么清除浮动
1. 给浮动的元素的祖先元素加上高度 --》浮动的元素不会自动撑开父元素的高度
2. clear: both;  clear就是清除，both会将左右浮动都清除，但是会使margin失效
3. overflow: hidden; BFC 
4. 使用额外的元素分割；

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