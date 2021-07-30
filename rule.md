# 编码规范文档

## 细节规范

- 代码缩进配置统一，具体在 `setting.json` 中配置；
- 编码需要遵循 `eslint` 规范，消除红色警告；
- 数据比对需要使用 `===` 比对；
- 禁用var声明变量；
- 打印 `log` 使用  `this.$logger.log('msg')`, 方便在发布时关闭日志输出；
- 使用 `v-for` 需要加 `key`， `key` 应保证在整个 `dom` 中的唯一性，不能简单使用 `:key="index"`，应该尽量使用 `:key="`detail-${index}`"` 的形式
- `.vue` 文件中模块顺序需要固定

```js
export default {
  name: '',
  props: {},
  mixins: {},
  components: {},
  data () {
    return {};
  },
  created () {},
  mounted () {},
  filters: {},
  computed: {},
  watch: {},
  methods: {},
}
```

- `views` 里面放页面入口文件，`components` 里面放组件文件，不要在 `views` 里面直接做组件，组件尽量做到通用抽象，组件命名必须使用  `BizXXX` 的形式；

```
- components
  - BizDownload.vue // 业务组件
  - Alert.vue // 通用组件
- views
  - project
    - ProjectDetail.vue // 页面入口组件
    - BizSubDetail.vue // 单页面使用组件
```

## 命名规范

- 命名要求见名知义，避免通用化的命名方式；
- 页面，组件统一使用大驼峰命名；
- 通用组件大驼峰命名，业务组件使用 `Biz` 开头大驼峰命名；
- 变量统一使用小驼峰命名；
- 常量使用 `const` + 全大写命名；
- 方法使用小驼峰命名；
- 触发请求的方法，需要以 `requestXXX` 格式命名；
- 触发跳转的方法，需要以 `goXXXX` 格式命名，表明是一个跳转方法，但是不要使用简单的  `go`；

```js
// Not Good
go() {
  this.$router.push({ name: 'home' })
}
// Good
goHomePage() {
  this.$router.push({ name: 'home' })
}
```

- 事件 **发出** 和 **接收** 命名要以 `onXXXX` 开头，表明是一个事件；

```js
👌
<TestComp @onDataComplete="onDataComplete">

this.$emit('onDataComplete', { data })
```

- 路由，由于模块较多，为了方便后面管理，路由需要分模块声明

```js
const routes = [
  {
    // 大驼峰命名，动词放在后面
    name: 'OrderCreate',
    // 路由，保证每一级都有意义
    path: '/order/create',
    // 组件，使用懒加载
    component: CreateOrder,
    meta: {
      title: '创建单'
    }
  },
]
```
## 文件结构

  - 组件结构遵循从上往下template，script，style的结构。
  - vue文件用户代码片段设置参考：
   "new vue file": {
        "scope": "vue",
        "prefix": "vueinit",
        "body": [
          "<template>",
          "  <div class=\"xxx-wrap\"></div>",
          "</template>",
          "",
          "<script>",
          "export default {",
          "  data () {",
          "    return {",
          "",
          "    }",
          "  },",
          "  created () {",
          "",
          "  },",
          "  methods: {",
          "",
          "  }",
          "}",
          "</script>",
          "",
          "<style lang=\"less\" scoped>",
          ".xxx-wrap {",
          "",
          "}",
          "</style>",
          "",
        ],
        "description": "new vue file"
      }
    }

## Template模板文件

- 尽量使用以.vue结束的单文件组件，方便管理，结构清晰。
- 标签语义化，避免清一色的div元素
- 样式class的命名：统一以小写字母开头，小写字母、中划线和数字组成。命名中尽量避免使用中文拼音，应该采用更简明有语义的英文单词进行组合。不建议使用驼峰法命名class属性。使用中划线的目的是为了避免和第三方库中的命名冲突。例如：xx_left,xx_line。
- 多特性，分行写，提高可读性。即一个标签内有多个属性，属性分行写。
- 自定义标签：使用自闭标签的写法。例如：，如果自定义标签中间需要传入slot，则写开始标签和结束标签，结束标签必须加/。
- 组件/实例选项中的空行。便于阅读和代码架构清晰。

## CSS 规范

- 尽量不用使用行内样式，不能复用，而且会导致 `dom` 过度复杂，查看代码时很费力；
- 使用 `less-scope` 嵌套的方式，开发效率高，查看 `css` 代码时可以分离模块查看，不至于太乱
- 为了防止样式污染，可添加scoped 属性，也可以通过设置作用域来防止样式污染，写样式的时候尽量少写元素选择器，为了提高代码查找速度，可以用类选择器。
- 避免使用标签选择器（效率低、损耗性能）
- 非特殊情况下，禁止使用 ID 选择器定义样式。有 JS 逻辑的情况除外。
- CSS 属性书写顺序：先决定定位宽高显示大小，再做局部细节修饰！推荐顺序：定位属性(或显示属性，display)->宽高属性->边距属性(margin, padding)->字体，背景，颜色等，修饰属性的定义

```css
<style lang="less" scoped>
.home {
  .name {

  }
}
</style>
```

- 抽象和使用公共的样式，对于使用较多的样式分离到 `style/common.css` 中
- 对于 `common.css` 里的样式仅可用在dom中，严禁在style中作为选择器使用
- `css` 选择器使用要规范，不能使用通用的 `class` 选择器作为标记，因为后期别人编写代码时仍旧有可能使用通用的 `class` 从而造成错误


## 组件

- 组件完成后需在 `components/index.js` 中导入，方便使用；
- 组件需要分文件夹存储，如果只有一个文件，建议直接使用 `index.vue` 编写，多组件，建议在 `xx.vue` 中编写
- 组件需要编写文档，按模块分离，主要说明参数，事件，使用场景，在哪个页面有使用，方便复用；
- 组件分 **通用组件** 和 **业务组件**，主要区分在是否和业务数据挂钩，通用组件按照功能命名，业务组件需以 `BizXXXX` 形式命名； 


目录结构：

```js
- components
  - NotFound.vue // 通用组件
  - Dialog  // 通用组件，多组件
    - Alert.vue
    - Confirm.vue
    - README.md
  - BizUserLogin  // 业务组件，单组件
    - index.vue
    - README.md
  - index.js // 组件统一管理导入
```

在 `index.js` 中统一导入管理；

```js
import Alert from '@/components/Dialog/Alert';
import BizUserLogin from '@/components/BizUserLogin';

export {
  Alert,
  BizUserLogin,
}
```

在页面中使用组件，使用大驼峰命名方式使用自定义组件和普通 `dom` 组件加以区分；

```js
<template>
  <BizUserLogin/>
</template>

<script>
  import BizUserLogin from '@/components'
  export default {
    components: {
      BizUserLogin
    },
  }
</script>
```

- 命名要准确，例如不能直接叫 `Detail.vue` 那样会导致出现很多重复的文件，在引用和搜索时都不方便，目录用来做模块划分，但是不能替代文件名；

```js
❌
- views
  - Home
    - Detail.vue
  - Order
    - Detail.vue
👌
- views
  - Home
    - HomeDetail.vue
  - Order
    - OrderDetail.vue
```

## 路由

1. 路由配置文件中，`name` 需用大驼峰命名，命名需要体现业务内容，`path` 需用全小写命名，可使用 `/` 分割，`component` 需用大驼峰命名
```js
{
  name: 'OrderDetail',
  path: '/order/detail',
  component: Detail,
  meta: {
    title: '单详情'
  }
}
```

2. 使用路由跳转时，必须使用 `name` 跳转，不能使用 `path`，固定的 `path` 非常不利于后期路由重构

```js
this.$router.push({ name: OrderDetail })
```
## git管理
