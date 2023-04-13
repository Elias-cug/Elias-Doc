# VUE
## 使用
1. 对于只有一个根元素的组件，当使用了 class 属性时，这些 class 会被添加到根元素上，并与该元素上已有的class合并
2. class的几种用法
```jsx
<div :class="{active: isActive}"> </div>
```
```jsx
<div class="foo" :class="{active: isActive}"> </div>
```
```jsx
data() {
  return {
    activeClass: 'active',
    errorClass: 'error'
  }
}
<div :class="[activeClass, errorClass]"> </div>
```

```jsx
<div :class="[isActive ? activeClass : '', errorClass]"></div>
```
```jsx
<div :class="[{ active: isActive }, errorClass]"></div>
```
3. 有状态的方法：使用 lodash 防抖函数
```js
import { debounce } from 'lodash-es'

export default {
  methods: {
    // 使用 Lodash 的防抖函数
    click: debounce(function () {
      // ... 对点击的响应 ...
    }, 500)
  }
}
```
不过这种方法对于被重用的组件来说是有问题的，因为这个预置防抖的函数是 有状态的：它在运行时维护着一个内部状态。如果多个组件实例都共享这同一个预置防抖的函数，那么它们之间将会互相影响。

要保持每个组件实例的防抖函数都彼此独立，我们可以改为在 created 生命周期钩子中创建这个预置防抖的函数：
```js
export default {
  created() {
    // 每个实例都有了自己的预置防抖的处理函数
    this.debouncedClick = _.debounce(this.click, 500)
  },
  unmounted() {
    // 最好是在组件卸载时
    // 清除掉防抖计时器
    this.debouncedClick.cancel()
  },
  methods: {
    click() {
      // ... 对点击的响应 ...
    }
  }
}
```

4. 在vue中，状态都是默认深层响应式的。这意味着即使更改深层次的对象或数组，改动也能被监测到。

5. 动态绑定多个值
> 这一点可以做透传
```js
data() {
  return {
    objectOfAttrs: {
      id: 'container',
      class: 'wrapper'
    }
  }
}

<div v-bind="objectOfAttrs"></div>
```

6. 闭合标签
vue中之所以能使用自闭合标签是因为 Vue 的模板解析器支持任意标签使用 `/>`作为标签关闭的标志。而在dom模板中必须显示的写出关闭标签，这是因为 HTML 只允许一小部分特殊的元素省略其关闭标签，最常见的就是 `<input>` 和 `<img>`

7. ref 用在 v-for 上不能保证与原数组顺序相同

8. watch
  - flush: 'post'
  - immediate: true 
  - watchEffect

9. defineProps(['title'])

10. $emit
- defineEmits(['enlarge-text'])
```vue
<!-- BlogPost.vue, 省略了 <script> -->
<template>
  <div class="blog-post">
    <h4>{{ title }}</h4>
    <button @click="$emit('enlarge-text')">Enlarge text</button>
  </div>
</template>
```