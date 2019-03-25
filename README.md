# react-router-breadcrumb
[![MIT Licence](https://img.shields.io/npm/l/react-router-breadcrumb.svg)](https://opensource.org/licenses/mit-license.php)
[![npm version](https://img.shields.io/npm/v/react-router-breadcrumb.svg)](https://www.npmjs.com/package/react-router-breadcrumb)
[![dependencies Status](https://david-dm.org/kelekexiao123/react-router-breadcrumb/status.svg)](https://david-dm.org/kelekexiao123/react-router-breadcrumb)
[![devDependencies Status](https://david-dm.org/kelekexiao123/react-router-breadcrumb/dev-status.svg)](https://david-dm.org/kelekexiao123/react-router-breadcrumb?type=dev)
[![downloads](https://img.shields.io/npm/dm/react-router-breadcrumb.svg)](https://npmcharts.com/compare/react-router-breadcrumb?minimal=true)

根据react-router提供的路由信息自动匹配对应内容并生成面包屑的React高阶组件。

## 安装

在项目目录下，执行以下命令：

```
npm install --save react-router-breadcrumb
```

## 使用

使用示例已上传。见[这里](https://github.com/kelekexiao123/react-router-breadcrumb/tree/master/example)。

## Q&A

1. 如果`react router` 生成的 `routes` 不是由自己手动维护的，甚至都没有存在本地，而是通过请求拉取到的，存储在 redux 里，通过 `react-redux` 提供的 `connect` 高阶函数包裹时，路由发生变化时并不会导致该面包屑组件更新。使用方法如下：

```js
function mapStateToProps(state) {
  return {
    routes: state.routes,
  };
}

connect(mapStateToProps)(
  withRouter(({ location }) =>
    BreadcrumbsHoc(location, routes)(BreadcrumbsComponent)
  )
);
```

---

这其实是 `connect` 函数的一个**bug**。因为 react-redux 的 connect 高阶组件会为传入的参数组件实现 shouldComponentUpdate 这个钩子函数，导致**只有 prop 发生变化时才触发更新相关的生命周期函数(含 render)**，而很显然，我们的 location 对象并没有作为 prop 传入该参数组件。

官方推荐的做法是使用 `withRouter` 来包裹 `connect` 的 `return value`，即

```js
withRouter(
  connect(mapStateToProps)(({ location, routes }) =>
    BreadcrumbsHoc(location, routes)(BreadcrumbsComponent)
  )
);
```

## 开源许可证

MIT

（你可以随意使用此项目，不需要提前告知我，除非你需要其它服务。）