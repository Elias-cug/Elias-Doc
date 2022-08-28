# React

## 生命周期

**过程————初始化阶段**

1. getDefaultProps:获取实例的默认属性
2. getInitialState:获取每个实例的初始化状态
3. componentWillMount：组件即将被装载、渲染到页面上
4. render:组件在这里生成虚拟的 DOM 节点
5. componentDidMount:组件真正在被装载之后

**运行中状态**

1. componentWillReceiveProps:组件将要接收到属性的时候调用
2. shouldComponentUpdate:组件接受到新属性或者新状态的时候（可以返回 false，接收数据后不更新，阻止 render 调用，后面的函数不会被继续执行了）
3. componentWillUpdate:组件即将更新不能修改属性和状态
4. render:组件重新描绘
5. componentDidUpdate:组件已经更新

**销毁阶段**

1. componentWillUnmount:组件即将销毁

**新版生命周期**

1. 使用 getDerivedStateFromProps 替换 componentWillMount
2. 使用 getSnapshotBeforeUpdate 替换 componentWillUpdate
3. 避免使用 componentWillReceiveProps

> 其实该变动的原因正是由于上述提到的 Fiber。首先从上面我们知道 React 可以分成 reconciliation 与 commit 两个阶段> 对应的生命周期如下:

reconciliation:

1. componentWillMount
2. componentWillReceiveProps
3. shouldComponentUpdate
4. componentWillUpdate

commit:

1. componentDidMount
2. componentDidUpdate
3. componentWillUnmount

## React 中 refs 的作用是什么
1. 获取子组件实例，操作子组件的一些方法
2. 做持久化存储

## 组件通信

1. 父子组件通信
   父组件通过向子组件传递 props

2. 子组件向父组件通信
   父组件将一个函数作为 props 传递给子组件，子组件调用回调函数

3. 跨级组件通信
   a) 中间组件层层传递 props
   b) 🍎 使用 context 对象

4. 非嵌套组件间通信
   a) 利用二者共同父组件的 context 进行通信
   b) 使用自定义事件的方式

5. 使用 redux 进行通信

## context 使用

```js
// 1. 创建并导出 context 对象
export const { Provider, Consumer } = React.createContext({})

// 2. 导入并使用函数获取要消费的状态

// 3. hook下使用 useContext 获取要消费的状态
```

## hook 下怎么使用 ShouldComponentUpdate
使用React.memo包裹组件

## react中函数组件与类组件的区别是什么
1. 函数组件是一个纯函数，它接收一个props对象返回一个react元素；而类组件需要去继承React.Component并且创建render函数返回react元素
2. 函数组件没有生命周期和状态state，而类组件有

## PureComponent Component 区别

1. 几乎相同，但是 PureComponent 通过 prop 和 state 的浅比较来实现

## 使用 React 的一些坑点
1. JSX 做表达式判断时候需要强转为 boolean
2. 尽量不要在 componentWillReviceProps 里使用 setState 如果一定要使用那么需要判断结束条件不然会出现无限重渲染导致页面崩溃
3. 给组件添加 ref 时候尽量不要使用匿名函数因为当组件更新的时候匿名函数会被当做新的 prop 处理让 ref 属性接受到新函数的时候 react 内部会先清空 ref 也就是会以 null 为回调参数先执行一次 ref 这个 props 然后在以该组件的实例执行一次 ref 所以用匿名函数做 ref 的时候有的时候去 ref 赋值后的属性会取到 null
4. 遍历子节点的时候不要用 index 作为组件的 key 进行传入

## react class 构建时，super(props)的作用
为了使 子组件中可以使用 this.props 调用父组件传递的 props。

## 调用 setState 之后发生了什么

1. 将要更新的 state 压入一个待更新队列（即内部实例的_pendingStateQueue）
2. 执行入栈更新操作 enqueueUpdate, 判断是否处于批量更新状态
3. 如若正处于更新，那么就先把实例推进 dirtyComponents 里等待下一次批量更新
4. 如果没有批量更新正在执行，则会调用一个批量更新任务

1. 在代码中调用 setState 函数之后，React会将传入的参数对象语组件当前的状态合并，然后触发调和过程。经调和过程吧，React 会以相对高效的方式根据新的状态构建 React 元素树并且着手重新渲染整个 UI 界面。在 React 得到元素树之后，React 会自动计算出新的树语老树的节点差异对界面进行最小化重渲染。在差异计算算法中，React 能够相对精确地知道哪些位置发生了改变以及应该如何改变，这就保证了按需更新，而不是全部重新渲染。如果在短时间内频繁setState，React 会将state的改变压入栈中，在合适的时机，批量更新state和视图，达到提高性能效果。

## setState是同步还是异步
**同步**
1. 首先在legacy模式下
2. 在执行上下问为空的时候去调用setState 
    - 可以使用一步调用setTimeout, Promise, MessageChannel等
    - 可以监听原生事件，注意不是合成事件，在原生事件的回调函数中执行setState就是同步的

**异步**
1. 如果是合成事件中的回调，executionContext !== DiscreteEventContext，所以不会进入，最终表现出异步
2. concurrent模式下都为异步

## setState 与生命周期
1. constructor 中不需要使用 state
2. componentWillMount 中同步的无用，异步可用于获取页面的初始数据
3. render shouldComponentUpdate 组件还没渲染结束就继续调用 setState 会无限触发更新
4. 可以用 setState 的声明周期函数有，componentDidMount，componentWillReceiveProps（getDerivedStateFromProps），componentDidUpdate（注意死循环）

## react 中 key 的作用是什么
**单节点**
1. key是单节点是否复用的第一判断条件（第二判断条件是type是否改变），如果key不同其他条件是完全不看的
2. 在新建节点时，key随着element对象被传入fiber的构造函数
> 所以这里才是key的核心作用，是调和函数中，针对单一节点是否可以复用的第一判断条件；对与单节点来讲key是可以省略的，react内部默认会设置成默认值null，在进行diff时由于null === null 为 true，前后render的key时一致的，可以进行复用比较；如果单节点显示的设置了key，且两次render时的key如果不一致，则无法复用

**多节点**
1. 新队列newChildren中的每一个对象（即reactElement对象）都需要同旧队列oldFiber中有相同key值的对象（即oldFiber对象）进行是否可复用的比较。key就是心就对象能够对应起来的唯一标识
2. 如果省略key或者直接使用列表index作为key，表现是一样的（key=null时，会采用index代替key进行比较）。在新旧对象比较时，只能按照index顺序进行比较，复用的成功率大大降低，大列表会出现性能问题。

> 在react中key是服务于diff算法，它的默认值是null，在diff算法过程中，新旧节点是否可以复用，首先会判定key是否相同，其后才会进行其他条件的判定。在源码中针对多节点（即列表组件）如果直接将key设置成index和不设置任何值的处理方案是一样的，如果使用不当轻则造成性能损耗，重则引起状态混乱造成bug。

## 概述下 React 中的事件处理逻辑
为了解决跨浏览器兼容性问题 React 会将浏览器原生事件 Browser Native Event 封装为合成事件 SyntheticEvent 传入设置的事件处理器中。这里的合成事件提供了与原生事件相同的接口不过它们屏蔽了底层浏览器的细节差异保证了行为的一致性。另外有意思的是 React 并没有直接将事件附着到子元素上而是以单一事件监听器的方式将所有的事件发送到顶层进行处理。这样 React 在更新 DOM 的时候就不需要考虑如何去处理附着在 DOM 上的事件监听器最终达到优化性能的目的

区别：
1. 对于时间名称命名方式，原生时间为全小写，react 事件采用小驼峰
2. 对于时间函数处理语法，原生事件为字符串，react 事件为函数；
3. react 事件不能采用return false 的方式来阻止浏览器的默认行为，而必须要明确的调用preventDefault(）来阻止默认行为。
合成事件是 react 模拟原生的 DOM 事件所有能力的一个事件对象，其优点如下：
1. 兼容所有浏览器，更好的跨平台
2. 将事件统一存放在一个数组，避免频繁的新增语删除
3. 方便 react 统一管理和事务机制
4. 事件的执行顺序为原生事件线执行，合成事件后执行，合成事件会冒泡绑定到 document 上，所以尽量避免合成事件与原生事件混用，如果原生事件阻止冒泡，可能会导致合成事件不执行，因为需要冒泡到 document 上合成事件才会执行。
react 怎么做事件代理，原理是啥
1. react 基于 virtual dom 实现了一个 syntheticEvent 层（合成事件层），定义的事件处理器会接受到一个合成事件对象的实例，它符合 w3c 标准，且与原生的浏览器事件拥有同样的借口，支持冒泡机制，所有事件都会绑定到最外层上。

## hook相关
**写过什么 hooks吗**
1. useErrorBoundary

**hook 中持久化方式**
1. useRef

**useState**
1. 可以进行函数式更新
```js
const [count, changeCount] = useState(0)

changeCount(prevCount => prevCount + 1)
```

**useRef**
1. 挂载 dom 节点
2. 模拟类组件的 this，充当持久化数据对象
```js
import React, {useRef, useEffect} from 'react';

// 1. 挂载dom节点
export default function UseRef() {
   const container = useRef(null)
   console.log('container', container) // 第一次拿不到

   useEffect(() => {
      console.log('container', container) // current 属性引用着虚拟 DOM 节点 
   }, [])

   return (<button ref={container}> Ref容器 </button>)
}
// 2. 模拟类组件的this，充当持久化数据对象
export default function UseRef() {
   const container = useRef(false)
   useEffect(() => {
      if(container.current) {
         console.log('模拟 componentDidUpdate，即除了初始化，之后的更新进到这里')
      } else {
         container.current = true 
      }
    })
    return (<button> Ref容器 </button>)
} 
```

**useCallback(fn, depArrs)**
1. 目的：父组件更新不希望子组件更新
2. 解决：父组件用useCallback包裹传递给子组件的函数，useCallback持久化缓存包裹的函数
3. 返回函数
4. useCallback 可以对函数进行缓存， 保证 onChange 不会随着组件更新而改变引用

**memo(fn, validFn)**
1. props不变化，不重新渲染
2. 模拟 shouldComponentUpdate
3. validFn 放个 shallowEqual
4. 返回一个组件
5. 包裹组件，组件层面
6. memo 会默认对所有 props 进行对比，如果不发生变化则不更新组件，避免父级引起的子级渲染

**useMemo**
1. 和vue中component差不多，用法如useCallback
2. 返回函数的调用结果

**useContext**
1. hooks 版本的 context 
2. Context.Provider 包裹后的子组件能拿到 context
3. 不受组件优化的影响
4. 使用
```js
import React, { useState, createContext, useContext } from 'react'

// 1. 创建共享数据源对象
const Context = createContext();

// 2. 父组件使用 Provider 包裹所有后代组件
export default function Parent() {
   const [count, changeCount] = useState(0)
   const store = {
      count,
      changeCount
   }
   return (
      <Context.Provider value={store}>
         <button onClick={()=>changeCount(count + 1)}>加一{count}</button>
         <Sub1 />
      </Context.Provider>
   )
}

// 3. 子组件使用 useContext 调用方法
function Sub1(){
   const ctx = useContext(Context)
   return <>
      <button onClick={()=>ctx.changeCount(c => c + 1)}>
         Sub1 能通过 Context 访问数据源 { ctx.count }
      </button>
   </>
} 
```

**useImperativeHandle + forwardRef**
1. 限制父组件访问的范围
```js

```

**自定义hook**
1. 一般使用官方的hook二次实现

**useSelector useDispatch**

**useLocation, useHistory, useParams**

## react 中的深度优先遍历
符合条件A 或者符合条件B则不会遍历其子节点，而直接判断是否有兄弟节点，如果没有兄弟节点，则回到有兄弟节点的直系父节点，重新开始外层的 while 循环
```js 
while(node !== null) {
  if(node.tag 符合条件A) {
    // 操作A 
  } else if (node.tag 符合条件B) {
    // 操作B 
  } else if (node.child !== null) {
    node.child.return = node 
    node = node.child 
    continue 
  }

  if(node === nodeRoot) {
    return 
  }

  while (node.sibling === null) {
    if(node.return === null || node.return === nodeRoot) {
      return
    }
    node = node.return 
  }

  node.sibling.return = node.return 
  node = node.sibling
}
```

## DIFF
**单节点diff**
- 判断是否有老的fiber节点 --》没有直接生成新fiber 
- 判断key是否有相同  --》不同直接删除 再查找下一个老fiber 
- 判断type是否相同  --》不同直接删除当前fiber在内的所有老的fiber --》生成新的fiber 
- 删除剩下的其他老的fiber --》服用老fiber并返回

**多节点diff**
1. 第一轮遍历
- 如果key不同则直接结束本轮循环
- newChildren或oldFiber遍历完，结束本轮循环
- key相同而type不同，标记老的oldFiber为删除，继续循环
- key相同而type也相同，则可以服用老oldFiber节点，继续循环 

2. 第二轮遍历
- newChildren遍历完而oldFiber还有，遍历剩下所有的oldFiber标记为删除，DIFF结束
- oldFiber遍历完，而newChildren还有，将剩下的newChildren标记为插入，DIFF结束
- newChildren和oldFiber都没有完成，则进行节点移动的逻辑

3. 第三轮
- 处理节点移动的情况

4. 例子
老：A-->B-->C-->D-->E-->F 
新：A-->C-->E-->B-->G-->D 
- 第一轮比较A和A，相同可以复用，更新，然后比较B和C，key不同直接跳出第一个循环
- 把剩下的oldFiber放入existingChildren这个map中
- 然后声明一个lastPlacedIndex变量，表示不需要移动的老节点的索引，默认为0
- 继续循环剩下的虚拟dom节点，从C开始
- 如果能在map中找到相同key相同type的节点则可以复用老fiber，并把此fiber从map中删除
- 如果在map中找不到相同key相同type的节点则创建新的fiber节点
- 如果是复用老的fiber，则判断老fiber的索引是否小于lastPlacedIndex
- 如果小于lastPlacedIndex则需要移动老fiber，lastPlacedIndex不变
- 如果大雨lastPlacedIndex则不需要移动老fiber，更新lastPlaecdIndex为老fiber的index 
- 虚拟DOM循环结束吧map中所有剩下的fiber全部标记为删除

## ReactDOM.render(element, container, callback) 流程

1. 创建 react root 
2. 创建 fiber root 
3. 创建 root fiber 
4. new FiberNode 作为 RootFiber 返回
5. 将 RootFiber 放到 root 对象的 current 属性， container 放到 containerInfo 属性，并初始化其他属性
6. 将 RootFiber 对象的 stateNode 属性设置为 FiberRoot 
7. 返回 FiberRoot 
8. 将 FiberRoot 放到 ReactRoot 实例的 _internalRoot 上
9. 返回 ReactRoot 
10. 将第三个参数 callback 的执行环境绑定为伏组件的 FiberRoot 对象
11. 开始调用 ReactRoot 实例的 render 函数，传入 ReactDOM.render的第一个参数与第三个参数
12. 创建 ReactWork 对象实例，将第三个参数传入这个实例的 _callbacks 属性上，在 container 更新提交阶段完成之后的执行回调
13. 开始处理 container 的 fiber 
14. 计算 container 对应 fiber 的到期时间 expirationTime 
15. 为 container 的 fiber 设置 context 
16. 调用 scheduleRootUpdate 开始进入对 root 的更新调度阶段
17. 利用到期时间创建更新器：createUpdate 
18. 将第一个 react 组件 app 作为更新器的 payload 
19. 将第三个参数回调函数执行器作为更新器的 callback 
20. 刷新副作用，与commitRoot相关
21. 将更新器加入 container 的 fiber 上的更新队列中 enqueueUpdate 
22. scheduleWork(current, expirationTime) 正式进入对 container 的fiber树的循环更新调度阶段

23. 开始对 fiber 树更新任务进行调度
24. 将当前更新任务对应的到期时间与当前 fiber 上存储的最高优先级更新任务到期时间相比，来更新 fiber.expirationTime。从发生更新任务的 fiber 开始往上遍历更新fiber树上每个节点的 childExpirationTime, 这个值对应着这个 fiber 子树上优先级最高的更新任务的到期时间。current-fiber 与 workingprogress-fiber都会进行同样的处理。最终遍历到rootfiber之后，结束遍历并返回fiber.stateNode
25. 如果当前           不处于renderRoot与commitRoot的阶段，并且之前有更新任务需要执行，并且当前的更新任务的到期时间比计划执行的更新任务到期时间的优先级高，则记录下打断计划任务的这个fiber到interruptedBy上，然后调用resetStack重置栈。
26. 利用 expirationTime 来更新 fiberRoot 上记录的所有子节点更新任务到期时间的区间[earliestPendingTIme, lastestPendingTime], 这个区间是root树上的还未更新的任务到期时间的区间
27. 当前发生的更新任务的到期时间expirationTime与fiberRoot上更新任务到期时间[earliestPendingTIme, lastestPendingTime]比较，如果落在区间内，则不需要修改区间；否则更改区间的某一个边界
28. 设置 root.nextExplrationTimeToWorkOn: 如果earliesPendingTime !== 0 即存在需要更新的任务，那么 nextExpirationTimeToWorkOn为earliestPendingTime。否则表示不存在需要更新的任务，那么如果latestPingedTime !== 0 即存在需要渲染为suspend组件，那么nextExpirationTimeToWorkOn为lastestPingedTime。否则将当前更新任务到期时间与[earliestSuspendedTime,lastestSuspendTime]。设置 root.expirationTimeToWorkOn优先级最高的到期时间。
29. 如果当前不处于renderRoot与commitRoot函数执行阶段或者处于commitRoot阶段或者下渲染的是其他root，则调用requestWork就开始对rootFiber进行调度

## react 数据结构
1. FiberRootNode 
```js
function FiberRootNode(containerInfo, tag, hydrate) {
  this.tag = tag // LegacyRoot, BlockingRoot, ConcurrentRoot 
  this.containerINfo = containerInfo // root节点，render函数的第二个参数
  this.current = null // current: Fiber 对象，对应的是 root 节点，即整个应用根对象
  this.finishedWork = null // 在commit阶段只会处理该值对应的任务
}

```

> FiberRoot --> rootFiber --> App
> FiberRoot 在整个应用中只能有一个，RootFiber可以有多个(可以写多个, ReactDom.render()方法)

2. FiberNode 
```js
function FiberNode() {
  // instance 
  this.tag = tag; // 当前 Fiber 的类型：ClassComponent FunctionComponent HostComponent 
  this.key = key 
  this.elementType = null 
  this.type = null 
  this.stateNode = null 
  
  // fiber 链表 
  this.return = null // 指向父级组件
  this.child = null // 指向子级fiber 
  this.sibling = null // 指向兄弟fiber  

  this.ref = null 

  // 更新相关
  this.pendingProps = pendingProps  // 将要执行更新的属性
  this.memoizedProps = null // 上一次更新的 props 
  this.updateQueue = null // 更新队列
  this.memoizedState = null // 上一次更新的State 
  this.dependencies = null // 一个列表存在fiber依赖的contexts，events 

  // TypedOfMode, StrictNode / COncurrentMode 
  this.mode = mode 

  // Effects 
  this.flags = NoFlags // 当前 fiber 阶段需要进行任务，包括：占位，更新，删除等
  this.nextEffect = null // 单链表用来快速查找下一个side Effect 
  this.firstEffect = null // 子树中第一个 side effect 
  this.lastEffect = null // 子树中最后一个 side effect 

  // 和 lanes 优先级相关
  this.lanes = NoLanes // 表示当前节点是否需要更新
  this.childLanes = NoLanes // 表示当前节点的子节点是否需要更新

  // current树和workInProgress树中节点相互关联的属性
  // 可以用于判断是否需要更新还是创建，有值表示更新，反之则需要创建
  this.alternate = null;
}
```

## render 流程
render的时候首先会创建一个fiberRoot，创建一个workInProcess（正在内存中构建的fiber树），benginwork，completeWork

## fiber双缓存解决什么问题
出现更新的时候首先在内存中修改这颗虚拟的树，更新完成之后，再commitRoot更新到用户界面

## 优先级
1. 什么时候分配优先级？ 创建fiberNode时
2. LanePriority（调和器里面） schedulePriority（调度器里面） ReactPriorityLevel（调和器里面）
3. schedulePriority 和 LanePriority

## scheduler 调度管理
1. 两大工作任务
2. 任务如何中断，如何执行
根据优先级情况中断，
3. requestIdleCallback
4. messageChannel 作用
- 生成浏览器EventLoop中的一个宏任务，实现将主线程还给浏览器，以便浏览器更新页面
- 浏览器更新页面后能够继续执行未完成的Scheduler中的任务
- 不用微任务迭代的原因是，微任务将在页面更新前全部执行完，达不到主线程还给浏览器的目的
- 选择 MessageChannel  的原因是因为 setTimeout(fn, 0)所创建的宏任务至少4ms的执行时差
5. shouldYield
6. taskQueue 小顶堆

## concurrent模式 
将渲染工作分解为多个部分，对任务进行暂停和恢复操作以避免阻塞浏览器。这意味着React可以再提交之前多次调用渲染阶段生命周期的方法，或者在不提交的情况下调用他们
整个scheduler的任务调度，时间切片，任务中断及恢复都依赖于concurent模式及Fiber数据结构


