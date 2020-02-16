# Vue-Composition-Api

## 准备

```bash
npm install @vue/composition-api --save
import Vue from 'vue'
import VueCompApi from '@vue/composition-api'
Vue.use(VueCompApi)
```

## 生命周期

Lifecycle hooks can be registered with directly imported `onXXX` functions:

```js
import { onMounted, onUpdated, onUnmounted } from 'vue'

const MyComponent = {
  setup() {
    onMounted(() => {
      console.log('mounted!')
    })
    onUpdated(() => {
      console.log('updated!')
    })
    onUnmounted(() => {
      console.log('unmounted!')
    })
  }
}
```



- **Mapping between 2.x Lifecycle Options and Composition API**
  - `beforeCreate` -> use `setup()`
  - `created` -> use `setup()`
  - `beforeMount` -> `onBeforeMount`
  - `mounted` -> `onMounted`
  - `beforeUpdate` -> `onBeforeUpdate`
  - `updated` -> `onUpdated`
  - `beforeDestroy` -> `onBeforeUnmount`
  - `destroyed` -> `onUnmounted`
  - `errorCaptured` -> `onErrorCaptured`

- **New hooks** 

  In addition to 2.x lifecycle equivalents, the Composition API also provides the following debug hooks:

  - `onRenderTracked`
  - `onRenderTriggered`

  Both hooks receive a `DebuggerEvent` similar to the `onTrack` and `onTrigger` options for watchers:

  ```js
  export default {
    onRenderTriggered(e) {
      // debugger
      console.log('视图更新---------', event)
    }
  }
  ```

    

## setup

- **执行时机**

  **setup** 函数会在 **beforeCreate** 之后、**created** 之前执行

  ```tiki wiki
  initLifecycle(vm): 确认组件（也是vue实例）的父子关系
  initEvents(vm): 将父组件的自定义事件传递给子组件
  initRender(vm): 提供将render 函数转为vnode的方法
  beforeCreate: 执行组件的 beforeCreate 钩子函数
  ```

- **接收 props 数据**

  - 在 `props` 中定义当前组件允许外界传递过来的参数名称：

    ```js
    export default {
      props: {
       	id: String
      }
    }
    ```

  - 通过 `setup` 函数的**第一个形参**，接收 `props` 数据：

    ```js
    export default {
      setup(props) {
          
      }
    }
    ```

    

- **context**

  `setup` 函数的第二个形参是一个**上下文对象**，这个上下文对象中包含了一些有用的属性，这些属性在 `vue 2.x` 中需要通过 `this` 才能访问到，在 `vue 3.x` 中，它们的访问方式如下：

  ```js
  const MyComponent = {
    setup(props, context) {
      context.attrs
      context.slots
      context.parent
      context.root
      context.emit
      context.refs
    }
  }
  ```

  

## reactive

`reactive()` 函数接收一个普通对象，返回一个响应式的数据对象。

- **基本用法**

  等价于 `vue 2.x` 中的 `Vue.observable()` 函数，`vue 3.x` 中提供了 `reactive()` 函数，用来创建响应式的数据对象，基本代码示例如下：

  ```js
  import { reactive } from '@vue/composition-api'
  // 创建响应式数据对象，得到的 state 类似于 vue 2.x 中 data() 返回的响应式对象
  const state = reactive({ count: 0 })
  ```

- **定义响应式数据供 template 使用**

  ```html
  <template>
      <p>当前的 count 值为：{{count}}</p>
  </template>
  
  <script>
  import { reactive } from '@vue/composition-api'
  
  export default {
     setup (props, ctx) {
        const state = reactive({count: 0})
        // setup 函数中将响应式数据对象 return 出去，供 template 使用
   	  return state
     }
  }
  </script>
  ```

  

## ref

- **基本语法**

  `ref()` 函数用来根据给定的值创建一个**响应式**的**数据对象**，`ref()` 函数调用的返回值是一个对象，这个对象上只包含一个 `.value` 属性：

  ```js
  import { ref } from '@vue/composition-api'
  
  // 创建响应式数据对象 count，初始值为 0
  const count = ref(0)
  
  // 如果要访问 ref() 创建出来的响应式数据对象的值，必须通过 .value 属性才可以
  console.log(count.value) // 输出 0
  // 让 count 的值 +1
  count.value++
  // 再次打印 count 的值
  console.log(count.value) // 输出 1
  ```

- 在 template 中访问 ref 创建的响应式数据

  ```html
  <template>
   <p>{{count}} --- {{name}}</p>
  </template>
  
  <script>
  import { ref } from '@vue/composition-api'
  
  export default {
     setup (props, ctx) {
       const count = ref(0)
       return {
           count,
           name: ref('zhangsan')
       }
     }
  }
  </script>
  ```

- 在 reactive 对象中访问 ref 创建的响应式数据

  ```js
  const count = ref(0)
  const state = reactive({
    count
  })
  
  console.log(state.count) // 输出 0
  state.count++            // 此处不需要通过 .value 就能直接访问原始值
  console.log(count)       // 输出 1
  
  //注意: 新的 ref 会覆盖旧的 ref，示例代码如下
  // 创建 ref 并挂载到 reactive 中
  const c1 = ref(0)
  const state = reactive({
    c1
  })
  
  // 再次创建 ref，命名为 c2
  const c2 = ref(9)
  // 将 旧 ref c1 替换为 新 ref c2
  state.c1 = c2
  state.c1++
  
  console.log(state.c1) // 输出 10
  console.log(c2.value) // 输出 10
  console.log(c1.value) // 输出 0
  ```



## isRef

`isRef()` 用来判断某个值是否为 `ref()` 创建出来的对象；应用场景：当需要展开某个可能为 `ref()` 创建出来的值的时候，例如：

```js
import { isRef } from '@vue/composition-api'

const unwrapped = isRef(foo) ? foo.value : foo
```

## toRefs

`toRefs()` 函数可以将 `reactive()` 创建出来的响应式对象，转换为普通的对象，只不过，这个对象上的每个属性节点，都是 `ref()` 类型的响应式数据，最常见的应用场景如下：

```js
<template>
  <div>
    <p>当前的count值为：{{count}}</p>
    <button @click="increment">+1</button>
  </div>
</template>

<script>
import { toRefs } from '@vue/composition-api'

export default {
  setup() {
    // 定义响应式数据对象
    const state = reactive({
      count: 0
    })
    
    // 定义页面上可用的事件处理函数
    const increment = () => {
      state.count++
    }
    
    // 在 setup 中返回一个对象供页面使用
    // 这个对象中可以包含响应式的数据，也可以包含事件处理函数
    return {
      // 将 state 上的每个属性，都转化为 ref 形式的响应式数据
      ...toRefs(state),
      // 自增的事件处理函数
      increment
    }
  }  
}
</script>
```

## computed

`computed()` 用来创建计算属性，`computed()` 函数的返回值是一个 `ref` 的实例。使用 `computed` 之前需要按需导入：

```js
import { computed } from '@vue/composition-api'
```

- **创建只读的计算属性**

  在调用 `computed()` 函数期间，传入一个 `function` 函数，可以得到一个只读的计算属性，示例代码如下：

  ```js
  // 创建一个 ref 响应式数据
  const count = ref(1)
  
  // 根据 count 的值，创建一个响应式的计算属性 plusOne
  // 它会根据依赖的 ref 自动计算并返回一个新的 ref
  const plusOne = computed(() => count.value + 1)
  
  console.log(plusOne.value) // 输出 2
  plusOne.value++            // error
  ```

- **创建可读可写的计算属性**

  ```js
  // 创建一个 ref 响应式数据
  const count = ref(1)
  
  // 创建一个 computed 计算属性
  const plusOne = computed({
    // 取值函数
    get: () => count.value + 1,
    // 赋值函数
    set: val => { count.value = val - 1 }
  })
  
  // 为计算属性赋值的操作，会触发 set 函数
  plusOne.value = 9
  // 触发 set 函数后，count 的值会被更新
  console.log(count.value) // 输出 8
  ```

  

## watch

`watch()` 函数用来监视某些数据项的变化，从而触发某些特定的操作，使用之前需要按需导入：

```js
import { watch } from '@vue/composition-api'
```

- **基本用法**

  ```js
  const count = ref(0)
  
  // 定义 watch，只要 count 值变化，就会触发 watch 回调
  // watch 会在创建时会自动调用一次
  watch(() => console.log('~~~~', count.value))
  // 输出 ~~~~ 0
  
  setTimeout(() => {
    count.value++
    // 输出 ~~~~ 1
  }, 1000)
  ```

-  **监视指定的数据源**

  - 监视 `reactive` 类型的数据源：

    ```js
    // 定义数据源
    const state = reactive({ count: 0 })
    // 监视 state.count 这个数据节点的变化
    watch(() => state.count, (count, prevCount) => { /* ... */ })
    ```

  - 监视 `ref` 类型的数据源：

    ```js
    // 定义数据源
    const count = ref(0)
    // 指定要监视的数据源
    watch(count, (count, prevCount) => { /* ... */ })
    ```

- **监视多个数据源**

  - 监视 `reactive` 类型的数据源：

    ```js
    const state = reactive({ count: 0, name: 'zs' })
    
    watch(
      [() => state.count, () => state.name],    // Object.values(toRefs(state)),
      ([count, name], [prevCount, prevName]) => {
        console.log(count)         // 新的 count 值
        console.log(name)          // 新的 name 值
        console.log('------------')
        console.log(prevCount)     // 旧的 count 值
        console.log(prevName)      // 新的 name 值
      },
      {
        lazy: true // 在 watch 被创建的时候，不执行回调函数中的代码
      }
    )
    
    setTimeout(() => {
      state.count++
      state.name = 'ls'
    }, 1000)
    ```

  - 监视 `ref` 类型的数据源：

    ```js
    const count = ref(0)
    const name = ref('zhangsan')
    
    watch(
      [count, name], // 需要被监视的多个 ref 数据源
      ([count, name], [prevCount, prevName]) => {
        console.log(count)
        console.log(name)
        console.log('-------------')
        console.log(prevCount)
        console.log(prevName)
      },
      {
        lazy: true
      }
    )
    
    setTimeout(() => {
      count.value++
      name.value = 'lisi'
    }, 1000)
    ```

- **清除监视**

  在 `setup()` 函数内创建的 `watch` 监视，会在当前组件被销毁的时候自动停止。如果想要明确地停止某个监视，可以调用 `watch()` 函数的返回值即可，语法如下：

  ```js
  // 创建监视，并得到 停止函数
  const unwatch = watch(() => { /* ... */ })
  // 调用停止函数，清除对应的监视
  unwatch()
  ```

- **watch 中清除无效的异步任务**

  有时候，当被 `watch` 监视的值发生变化时，或 `watch` 本身被 `stop` 之后，我们期望能够清除那些无效的异步任务，此时，`watch` 回调函数中提供了一个 `cleanup registrator function` 来执行清除的工作。这个清除函数会在如下情况下被调用：

  - watch 被重复执行了
  - watch 被强制 `stop` 了

  ```html
  <template>
  	<input type="text" v-model="keywords" />
  </template>
  
  <script>
  // 定义响应式数据 keywords   
  const keywords = ref('')
  
  // 异步任务：打印用户输入的关键词
  const asyncPrint = val => {
    // 延时 1 秒后打印
    return setTimeout(() => {
      console.log(val)
    }, 1000)
  }
  
  // 定义 watch 监听
  watch(
    keywords,
    (keywords, prevKeywords, onCleanup) => {
      // 执行异步任务，并得到关闭异步任务的 timerId
      const timerId = asyncPrint(keywords)
  
      // 如果 watch 监听被重复执行了，则会先清除上次未完成的异步任务
      onCleanup(() => clearTimeout(timerId))
    },
    // watch 刚被创建的时候不执行
    { lazy: true }
  )
  
  // 把 template 中需要的数据 return 出去
  return {
    keywords
  }
  </script>
  ```

## provide & inject

`provide()` 和 `inject()` 可以实现嵌套组件之间的数据传递。这两个函数只能在 `setup()` 函数中使用。父级组件中使用 `provide()` 函数向下传递数据；子级组件中使用 `inject()` 获取上层传递过来的数据。

- **共享普通数据**

  ```html
  // App.vue
  <template>
    <div id="app">
      <h1>App 根组件</h1>
      <hr />
      <LevelOne />
    </div>
  </template>
  
  <script>
  import LevelOne from './components/LevelOne'
  // 1. 按需导入 provide
  import { provide } from '@vue/composition-api'
  
  export default {
    name: 'app',
    setup() {
      // 2. App 根组件作为父级组件，通过 provide 函数向子级组件共享数据（不限层级）
      //    provide('要共享的数据名称', 被共享的数据)
      provide('globalColor', 'orange')
    },
    components: {
      LevelOne
    }
  }
  </script>
  ```

  ```html
  // LevelOne.vue
  <template>
    <div>
      <!-- 4. 通过属性绑定，为标签设置字体颜色 -->
      <h3 :style="{color: themeColor}">Level One</h3>
      <hr />
    <LevelTwo />
    </div>
  </template>
  
  <script>
  import LevelTwo from './LevelTwo'
  // 1. 按需导入 inject
  import { inject } from '@vue/composition-api'
  
  export default {
    setup() {
      // 2. 调用 inject 函数时，通过指定的数据名称，获取到父级共享的数据
      const themeColor = inject('globalColor')
      
      // 3. 把接收到的共享数据 return 给 Template 使用
      return {
        themeColor
      }
    },
    components: {
      LevelTwo
    }
  }
  </script>
  ```

  ```html
  // LevelTwo.vue
  <template>
    <div>
      <!-- 4. 通过属性绑定，为标签设置字体颜色 -->
      <h5 :style="{color: themeColor}">Level Two</h5>
    </div>
  </template>
  
  <script>
  // 1. 按需导入 inject
  import { inject } from '@vue/composition-api'
  
  export default {
    setup() {
      // 2. 调用 inject 函数时，通过指定的数据名称，获取到父级共享的数据
      const themeColor = inject('globalColor')
  
      // 3. 把接收到的共享数据 return 给 Template 使用
      return {
        themeColor
      }
    }
  }
  </script>
  ```
  
- **共享 ref 响应式数据**

  如下代码实现了点按钮切换主题颜色的功能，主要修改了 `App.vue` 组件中的代码，`LevelOne.vue` 和 `LevelTwo.vue` 中的代码不受任何改变 (Vue2.x provide/inject实现数据响应需要传Object)：

  ```html
  // App.vue
  <template>
    <div id="app">
      <h1>App 根组件</h1>
      
      <!-- 点击 App.vue 中的按钮，切换子组件中文字的颜色 -->
      <button @click="themeColor='red'">红色</button>
      <button @click="themeColor='blue'">蓝色</button>
      <button @click="themeColor='orange'">橘黄色</button>
  
      <hr />
      <LevelOne />
    </div>
  </template>
  
  <script>
  import LevelOne from './components/LevelOne'
  import { provide, ref } from '@vue/composition-api'
  
  export default {
    name: 'app',
    setup() {
      // 定义 ref 响应式数据
      const themeColor = ref('red')
      
      // 把 ref 数据通过 provide 提供的子组件使用
      provide('globalColor', themeColor)
      
      // setup 中 return 数据供当前组件的 Template 使用
      return {
        themeColor
      }
    },
    components: {
      LevelOne
    }
  }
  </script>
  ```



## template refs

通过 `ref()` 还可以引用页面上的元素或组件。

- 元素的引用

  ```html
  <template>
    <div>
      <h3 ref="header">TemplateRefOne</h3>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from '@vue/composition-api'
  
  export default {
    setup() {
      // 创建一个 DOM 引用
      const header = ref(null)
  
      // 在 DOM 首次加载完毕之后，才能获取到元素的引用
      onMounted(() => {
        // 为 dom 元素设置字体颜色
        // h3Ref.value 是原生DOM对象
        header.value.style.color = 'red'
      })
  
      // 把创建的引用 return 出去
      return {
        header
      }
    }
  }
  </script>
  ```

  ```html
  <template>
    <div
      v-for="(item, i) in list"
      :ref="el => { divs[i] = el }">
      {{ item }}
    </div>
  </template>
  
  <script>
  import { ref, reactive, onBeforeUpdate } from 'vue'
  
  export default {
    setup() {
      const list = reactive([1, 2, 3])
      const divs = ref([])
  
      // make sure to reset the refs before each update
      onBeforeUpdate(() => {
        divs.value = []
      })
  
      return {
        list,
        divs
      }
    }
  }
  </script>
  ```

  

- **组件的引用**

  ```html
  // TemplateRefOne.vue
  <template>
    <div>
      <h3>TemplateRefOne</h3>
      
      <!-- 4. 点击按钮展示子组件的 count 值 -->
      <button @click="showNumber">获取TemplateRefTwo中的count值</button>
  
      <hr />
      <!-- 3. 为组件添加 ref 引用 -->
      <TemplateRefTwo ref="comRef" />
    </div>
  </template>
  
  <script>
  import { ref } from '@vue/composition-api'
  import TemplateRefTwo from './TemplateRefTwo'
  
  export default {
    setup() {
      // 1. 创建一个组件的 ref 引用
      const comRef = ref(null)
  
      // 5. 展示子组件中 count 的值
      const showNumber = () => {
        console.log(comRef.value.count)
      }
  
      // 2. 把创建的引用 return 出去
      return {
        comRef,
        showNumber
      }
    },
    components: {
      TemplateRefTwo
    }
  }
  </script>
  ```

  ```html
  // TemplateRefTwo.vue
  <template>
    <div>
      <h5>TemplateRefTwo --- {{count}}</h5>
      <!-- 3. 点击按钮，让 count 值自增 +1 -->
      <button @click="count+=1">+1</button>
    </div>
  </template>
  
  <script>
  import { ref } from '@vue/composition-api'
  
  export default {
    setup() {
      // 1. 定义响应式的数据
      const count = ref(0)
      
      // 2. 把响应式数据 return 给 Template 使用
      return {
        count
      }
    }
  }
  </script>
  ```



## createComponent

这个函数仅仅提供了类型推断，方便在结合 TypeScript 书写代码时，能为 `setup()` 中的 `props` 提供完整的类型推断。

```js
import { createComponent } from 'vue'

export default createComponent({
  props: {
    foo: String
  },
  setup(props) {
    props.foo // <- type: string
  }
})
```

​	





