# javascript

## JS 基础
**1. map 和 object 区别**
1. 键值
2. 可迭代
3. 遍历顺序
4. 是否会覆盖原型
5. 获取长度
6. 转JSON --》map 怎么转 json，又怎么转回来
7. 性能上
8. 怎么选择使用 map 和 object


**2. foreach为啥不能跳出循环**

回调函数里面不return不出去，break非法。

**3. let const var functioin**
1. var 声明在浏览器环境中会挂在到window上，而 let 和 const 声明变量不会提升
2. var 声明存在变量提升，let 和 const 不存在变量提升
3. 同一作用域下 var 可以声明同名变量，let const不能
4. let 和 const 声明会形成块级作用域
5. const 一旦声明必须赋值，不能用 null 占位，声明后不能再修改
6. 函数声明，初始化都会提升

**4. esm 和 cmj 区别**
1. esm 引用拷贝； cmj 值拷贝
2. esm 编译时输出接口；cmj 运行时加载

**5. esnext新增加类型**
1. Symbol
2. BigInt --》Number 限制在$2^53 - 1$ --》任意大**整数**

**6. instanceof 原理**
1. `case.__proto__ === Constructor.prototype`
2. 一直向上找

**7. 类型判断**
1. typeof --》null 和 function
2. `Object.prototype.toString.call()`
3. instanceof
4. NaN 判断
```js 
function _isNaN(val) {
  if (val !== val) {
      return true;
  }
  return false;
}

Object.is(c, NaN);    // 变量c是NaN的话会返回true
```

**8. 介绍下 Set, Map, WeakSet, 和 WeakMap**

1. set：对象允许存储任何类型的唯一值，无论时原始值或者是对象的引用。类似于数组。

new方法：可以接受数组进行初始化

方法：add(), has(), delete(), clear(), keys(), values(), entries(), forEach()

使用场景：存唯一值，检测链表是否有环

2. weakSet: 成员都是对象；成员都是弱引用，可以被垃圾回收机制回收，可以用来保存 DOM 节点，不容易造成内存泄露。只要这些对象在外部消失，它在 WeakMap 里面的引用就会消失。

new方法：可以接受一个数组或类似数组的对象作为参数。数组成员必须是对象

注意 🔥: 不支持遍历 

3. Map: 区别于object只能使用字符串作为键值，Map可以使用各种类型的值作为键值。

new方法：可以接受一个数组作为参数，该数组的成员是一个个表示键值对的数组。

方法：set(), get(), has(), size(), delete(), clear(), keys(), values(), entries(), forEach()

注意 🔥: 只有对同一个对象的引用， Map结构才将其视为同一个键。

```js
const map = new Map()
map.set(['a'], 555)
map.get(['a']) // undefined
```

4. WeakMap

类似于Map

注意: 只接受对象作为键名（null 除外）；WeakMap 的键名所指向的对象不计入垃圾回收机制。

场景：WeakMap 的设计目的在于，有时我们想在某个对象上面存一些数据，但这会形成对这个对象的引用。注册监听事件的listener对象很适合 WeakMap 来实现。另一个用处是部署私有属性。

方法：get(), set(), has(), delete()

```js
const e1 = document.getElementById('foo')
const e2 = document.getElementById('bar')
const arr = [[e1, 'foo 元素'], [e2, 'bar 元素']]
```

**9. 三种判断数组类型的方法**
1. Object.prototype.toString.call()

每一个继承 Object 的对象都有 toString 方法，如果 toString 方法没有重写的话，会返回[Object type]，其中 type 为对象的类型。但当除了 Object 类型的对象外，其他类型直接使用 toString 方法时，会直接返回都是内容的字符串，所以我们需要使用 call 或者 apply 方法来改变 toString 方法的执行上下文。该方法对于所有基本的类型数据都能进行判断，即使 null 和 undefined。

2. instanceof

instanceof 的内部机制是通过判断对象的原型链中是不是能找到类型的 prorotype 。使用 instanceof 判断一个对象是否为数组，instanceof 会判断这个对象的原型链上是否会找到对应的 Array 的原型，找到返回true，否则返回 false。所有对象 instanceof 只能判断对象类型，原始类型不可以。并且所有对象类型 instanceof Object 都是 true

3. Array.isArray()

当检测 Array 实例时，Array.isArray 优于 instanceof，因为 Array.isArray 可以检测出 iframes.

**10. 全局作用域中，用 const 和 let 声明的变量不在 window 上，那到底在哪里？如何去获取**

在 es5 中，顶层对象的属性和全局变量是等价的， var 和 function 命令声明的全局变量，自然是顶层对象

但 es6 规定，var 命令和 function 命令声明的全局变量，依然是顶层对象的属性，但 let 和 const 命令声明的变量，不属于顶层对象的属性。

**11. es5/es6的继承除了写法以外还有什么区别**
1. es5 的继承实质上是先创建子类的实例对象，然后再将父类的方法添加到 this 上

2. es6 的机制完全不同，实质上是先创建父类的实例对象 this （所以必须先调用父类的super方法）然后再用子类的构造函数修改 this

3. es5 的继承通过原型或构造函数机制来实现

4. es6 通过 class 关键字定义类，里面有构造方法，类之间通过 extends 关键字实现继承

5. 子类必须在 constructor 方法中调用 super 方法，否则新建实例报错。因为子类没有自己的 this 对象，而是继承了父类的 this 对象，然后对其进行加工。如果不调用 super 方法，子类得不到 this 对象。

6. 注意 super 关键字指代父类的实例，即父类的 this 对象，在子类构造器中，调用 super 后，才可使用 this 关键字，否则会报错

**12. 如何判断一个数据是 NaN**

NaN定义：非数字 `typeof NaN === 'number'` 
1. 利用定义 
```js
typeof a === 'number' && isNaN(a)
```

2. 利用NaN是唯一一个不等于任何自身的特点
```js
a !== a
```

**13. JS 中常见的内存泄露**
1. 意外的全局变量
2. 被遗忘的计时器或回调函数
3. 脱离的 DOM 引用
4. 闭包


**14. 怎么监听 dom 元素出现在可见区域内**
```js
// 1. getBoundingClientRect() + scroll事件 
const ele = document.getElementById('foo')
const rectObj = ele.getBoundingClientRect()
rectObj = {top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0}


// 2. IntersectionObserver()
// callback 为可见性变化时的回调函数，option是配置对象
// callback 可见时调用一次，不可见时调用一次
const io = new IntersectionObserver((entries) => {}, option)
const ele = document.getElementById('foo')
// 开始观察
io.observer(ele)
// 停止观察
io.unobserver(ele)
// 关闭观察器
io.disconnect()
```

**15. 图片模糊加载**
```js
//1. 加载缩略图 2. new Image().src下载大图 3. 下载完成后将显示图片的地址更换
```
**16. 箭头函数和普通函数的区别**
1. 箭头函数体内的 this 对象，就是定义时所在的对象，而不是使用时所在的对象
2. 不可以使用 arguments 对象，该对象在函数体内不存在，如果要用可以用 rest 参数代替
3. 不可以使用 yield 命令，因此箭头函数不能做 Generator 函数
4. 不可以使用 new 命令，没有子集的this，无法调用 call apply。没有 prototype 属性

**17. 原始 ajax 怎么取消请求**
1. abort方法

**18. requestAnimationFrame & requestIdleCallback**
1. requestAnimationFrame 每一帧必定会执行，requestIdleCallback 是浏览器空闲来执行任务。
2. 假如浏览器一直处于非常忙碌的状态，requestIdleCallback 注册的任务有可能永远不会执行。此时可通过设置 timeout （见下面 API 介绍）来保证执行。
3. 一些低优先级的任务可使用 requestIdleCallback 等浏览器不忙的时候来执行，同时因为时间有限，它所执行的任务应该尽量是能够量化，细分的微任务（micro task）。因为它发生在一帧的最后，此时页面布局已经完成，所以不建议在 requestIdleCallback 里再操作 DOM，这样会导致页面再次重绘。DOM 操作建议在 rAF 中进行。同时，操作 DOM 所需要的耗时是不确定的，因为会导致重新计算布局和视图的绘制，所以这类操作不具备可预测性。Promise 也不建议在这里面进行，因为 Promise 的回调属性 Event loop 中优先级较高的一种微任务，会在 requestIdleCallback 结束时立即执行，不管此时是否还有富余的时间，这样有很大可能会让一帧超过 16 ms。

**19. [[prototype]]链**
1. 链的尽头指向内置的 Object.prototype
2. `myObject.foo = "bar"` 时的三种情况《你不知道的js》（145）
a) 非只读； b) 只读； c) 是一个setter；

3. 类函数
```js
function Foo() {
  console.log('foo')
}
const foo = new Foo()
```
类函数会将实例foo内部的[[prototype]]链接到Foo.prototype，会形成如下等式：
```js
Object.getProrotypeOf(foo) === Foo.prototype

Foo.prototype.constructor === Foo

foo.constructor === Foo
```

**20. Object.create原理**
```js
Bar.prototype = Object.create(Foo.prototype)

// 上面等价于ES6 语法
Object.setPrototype(Bar.prototype, Foo.prototype)
```

**21. this绑定**
1. 默认绑定
区分严格模式和非严格模式

2. 隐式绑定
回调函数丢失 this 是非常常见的

3. 显示绑定
call apply bind

4. new 绑定

使用 new 来调用函数

a) 创建或者构造一个全新的对象

b) 这个新对象会被执行[[prototype]]连接

c) 这个新对象会绑定到函数调用的 this

d) 如果函数没有返回其他对象，那么 new 表达式中的函数调用会自动返回这个新对象

简单实现如下：
```js 
function _new(constructor, ...arg) {
  let resultObj = {}
  Object.setPrototypeOf(resultObj, constructor.prototype)
  let result = constructor.call(resultObj, ...arg)
  return type result === 'Object' ? result : resultObj
}
```

5. 优先级顺序
new --> 显示绑定 --> 隐式绑定 --> 默认绑定

6. 箭头函数
this指向当前函数所在作用域

**22. 解构**
1. = 表示赋值默认 `const {a=a1} = {a: 1} `
2. : 表示起别名 `const {a: a1} = {a: 1}`

**23. 严格模式**
1. 不允许使用未声明的变量
2. 不允许变量重名
3. 不允许删除变量或对象
4. 不允许给只读属性赋值
5. with，eval的一些限制
6. 禁止 this 关键字指向全局对象

**24. HTML5 file API加canvas实现图片前端JS压缩**

**25. 怎么判断一个纯对象**
> 通过 `{}` 或者 `new Object`创建的对象
```js
//1.
function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false


  let proto = obj
  // 这一步知识为了获取顶层的原型链，等同于 Object.prototype
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto)
  }

  return Object.getPrototypeOf(obj) === proto
}

// 2.
function getObjectClassLabel(value: any): string {
  return Object.prototype.toString.call(value)
}

function isPlainObject(value: any): boolean {
  if (getObjectClassLabel(value) !== '[object Object]') {
    return false
  }

  const prototype = Object.getPrototypeOf(value)

  // TODO: 原型链到null可以吗
  return prototype === null || prototype === Object.prototype
}
```

**26. dynamic import**
1. 静态代码会显著减慢代码的加载速度，而且导入的代码可能用不上，或者是在导入之后其他的行为中用到。
2. 静态代码会增加程序内存使用
3. 导入的代码可能加载的时候用不上
4. When the import specifier string needs to be constructed dynamically. (Static import only supports static specifiers.)
5. 当导入的模块有副作用时，除非某些条件为真，否则您不希望出现这些副作用。 （建议不要在模块中产生任何副作用，但有时您无法在模块依赖项中控制它。）
> 仅在必要时使用动态导入。 静态形式更适合加载初始依赖项，并且可以更容易地从静态分析工具和tree-shaking中受益。
6. 语法
To dynamically import a module, the import keyword may be called as a function. When used this way, it returns a promise.
```js
import('/modules/my-module.js')
  .then((module) => {
    // Do something with the module.
  });

// 也可以用 await 语法
let module = await import('/modules/my-module.js');
```

## 原型链
> 对象中特殊的内置属性，表示对其他对象的引用。一般用[[Prototype]]表示。

#### 指定对象原型链的方式
1. 创建时自动指定
```js 
const a = {}
a.__proto__ === Object.prototype
```

2. 通过Object.create() 指定 
```js
const anotherObj = {
  a: 'hello'
}
const obj = Object.create(anotherObj)
obj.__proto__ === anotherObj
```

3. new 关键字指定
```js 
function Foo() {}
const foo = new Foo()
foo.__proto === Foo.prorotype
```

4. 通过 setPrototypeOf 指定 
```js 
const anotherObj = {}
const obj = {}
Object.setPrototypeOf(obj, anotherObj)
obj.__proto__ === anotherObj
```

#### 判断对象原型链的方式
1. instanceof
```js 
function Foo () {}
const a = new Foo()

a instanceof Foo // true
```
> instanceof回答的问题是 a 的整条[[Prototype]]链中是否有Foo.prototype指向的对象。这个方法只能处理对象和函数之间的关系，如果想判断两个对象之间是否通过[[Prototype]]链关联，只用instalceof无法实现。例如如下使用时不对的

```js
const a = {}
const b = Object.create(a)
a instanceof b // Error
```

2. isPrototypeOf 
```js 
const a = {}
const b = Object.create(a)
a.isPrototypeOf(b) //  true
```

#### constructor属性
当使用构造函数时会有如下：
```js
function Foo() {}
const foo = new Foo()
foo.constructor === Foo // true
Foo.prototype.constructor === Foo // true 
```
实际上，foo实例上的constructor属性，来自 Foo 构造函数的 prototype。 Foo.prototype的 .constructor属性是 Foo 函数声明时的默认属性。如果创建了一个新对象并替换了函数默认的.prototype对象引用，那么新对象并不会自动获得.constructor属性。如下：
```js 
function Foo() {}
Foo.prototype = {}
const foo = new Foo()
foo.constructor === Foo // false 
foo.constructor === Object // true  获取的是链顶端的Object.prototype
```

#### 一些例题
1. 
```js 
function Fn(){
    var n = 10
    this.m = 20
    this.aa = function() {
        console.log(this.m)
    }
}
Fn.prototype.bb = function () {
    console.log(this.n)
}
var f1 = new Fn()
Fn.prototype = {
    aa: function(){
        console.log(this.m + 10)
    }
}
var f2 = new Fn()
console.log(f1.constructor)    // Fn
console.log(f2.constructor)    // Object
f1.aa()   // 20
f1.bb()   // undefined
f1.__proto__ // {bb: fn()}
f1.__proto__.aa() // Error
f2.aa()   // 20 
f2.bb() // Error
f2.__proto__ // {aa: fn()}
f2.__proto__.aa() // NaN 这里 this 指向 f2.__prototype__，f2.__prototype__上无属性 m。
```
2. 
```js 
var anotherObject = {
  a: 2
}
var myObject = Object.create(anotherObj)
anotherObj.a // 2
myObject.a // 2

anotherObj.hasOwnProperty('a') // true
myObject.hasOwnProperty('a') // false 

myObject.a++  // myObject.a = myObject.a + 1

anotherObj.a // 2
myObject.a // 3

myObject.hasOwnProperty('a') // true
```

## PromiseA+规范

### 术语
1. promise：有then方法的对象或函数
2. thenable: 是一个有then方法的对象或函数
3. value: promise状态成功时的值，resolve(value), 可以时任意类型
4. reason: promise状态失败时的值，reject(reason)
5. exception: 使用throw抛出的异常

### 规范

**promise的状态都有哪些**
1. pending
  - 初始状态，可改变
  - 在resolve和reject前都处于这个状态
  - 通过resolve -》fulfilled状态
  - 通过reject --》rejected状态
2. fulfillled
  - 最终态，不可变
  - 一个promise被resolve之后会变成这个状态
  - 必须有一个value值

3. rejected
  - 最终态，不可变
  - 一个promise被reject之后会变成这个状态
  - 必须有一个reason值

### then 
promsie应该提供一个then方法，用来访问最终的结果，无论是value还是reason 
```js 
promise.then(onFulfilled, onRejected)
```

**参数规范**
1. onFulfilled必须时函数类型，如果传入的不是函数，应该被忽略
2. onRejected必须时函数类型，如果传入的不是函数，应该被忽略

**onFulfilled**
1. 在promise变成fulfilled时，应该调用onFulfilled, 参数是value 
2. 在promise变成fulfilled之前，不应该调用 onFulfilled 
3. 只能被调用一次

**onRejected特性**
1. 在promise变成rejected时，应该调用onFulfilled, 参数是reason
2. 在promise变成rejected之前，不应该调用 onRejected
3. 只能被调用一次

**onFulfilled和onRejected应该是微任务阶段执行**
1. 实现promise的时候，如何去生成微任务

**then方法可以被调用多次**
1. promise状态变成fulfiled后，所有的onFulfilled回调都需要按照注册的顺序执行，也可以理解为按照.then的顺序执行
2. promise状态变成rejected后，所有的onRejected回调都需要按照注册的顺序执行，也可以理解为按照.then的顺序执行

**返回值**

then应该返回一个promise

```js 
const p2 = promise.then(onFulfilled, onRejected)
```

1. onFulfilled 或 onRejected 执行结果为X，调用resolvePromise 
2. onFulfilled 或 onRejected 执行过程中抛出了异常e，promise2需要被reject。
3. 如果 onFulfilled 不是一个函数，promise2 以 promise1 的value触发fulfilled
4. 如果 onRejected 不是一个函数，promise2 以 promise1 的reason触发fulfilled 

**resolvePromise**
```js 
resolvePromise(promise2, x, resolve, reject)
```
1. 如果promise2和x相等，reject typeError 
2. 如果x是一个promise 
  - 如果x pending，promise必须要在pending状态，直到x的状态变更
  - 如果x fulfilled，value -》fulfilled 
  - 如果x rejected，reason -》rejected 
3. 如果x是一个Object / Function 
  - 去获取const then = x.then，reject reason 
  - then是一个函数，then.call(x, resolvePromiseFn, rejectPromiseFn)

###  一步步实现一个 Promsie

1. `const promise = new Promise()`， 代表Promise应该是一个构造函数或者class。
2. 定义三种状态
3. 初始化一个状态
4. 实现resolve，reject方法
  - 这两个方法要更改status，从pending变成fulfilled/rejected；
  - 入参分别为value / reason 
5. 对于实例化promise时的入参处理
  - 入参是一个函数，接收resolve，reject两个参数
  - 初始化promise的时候，就要同步执行这个函数，并且有任何的报错都要通过reject抛出去
6. then方法 
  - then接收两个参数，onFulfilled和onRejected
  ```js
  promise.then(onFulfilled, onRejected)
  ```
  - 检查参数是不是函数
  - 根据当前promise的状态调用不同的函数
  - 首先我们拿到所有的回调，新建两个数组，分别存储成功和失败的回调，调用then的时候，如果还是pending就存入数组
  - 在status改变的时候，执行回调
7. then的返回值
  - 如果onFulfilled或者onRejected抛出一个异常e，那么新的promise必须reject e；
  - 返回值应该是一个promise 
  - 如果onFulfilled不是函数，且promise1成功执行，promise2必须返回同样的状态和value
  - 如果onRejected不是函数，且promise1拒绝执行，promise2必须返回同样的状态和reason
  - 如果onFulfilled或者onRejected返回一个x，执行resolvePromise