'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBreadcrumbs = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 以递归的方式展平react router数组
var flattenRoutes = function flattenRoutes(arr) {
  return arr.reduce(function (prev, item) {
    prev.push(item);
    return prev.concat(Array.isArray(item.items) ? flattenRoutes(item.items) : item);
  }, []);
};

// 对每个路径提供匹配的breadcrumb
var getBreadcrumb = function getBreadcrumb(_ref) {
  var flattenRoutes = _ref.flattenRoutes,
      curSection = _ref.curSection,
      pathSection = _ref.pathSection;

  var matchRoute = flattenRoutes.find(function (ele) {
    var path = ele.path;

    if (!path) {
      throw new Error('React-Router 规定 Router 中每一个 route 必须包含 `path` 属性');
    }
    // 查找是否有匹配
    // exact 为 react-router4+ 的属性，用于精确匹配路由
    // matchPath 为 react-router4+ 提供的API，
    return (0, _reactRouter.matchPath)(pathSection, { path: path, exact: true });
  });

  // 返回breadcrumb的值，没有name属性的话就返回匹配子路径名
  if (matchRoute) {
    return _react2.default.createElement(
      'span',
      { path: matchRoute.path },
      matchRoute.name || curSection
    );
  }
  // 对于routes表中不存在的路径
  // 根目录默认名称为首页.
  var defaultRootPageName = '首页';
  return _react2.default.createElement(
    'span',
    { path: pathSection },
    pathSection === '/' ? defaultRootPageName : curSection
  );
};

// 将路径名split成若干部分，分别查找路由匹配项
var getBreadcrumbs = exports.getBreadcrumbs = function getBreadcrumbs(_ref2) {
  var flattenRoutes = _ref2.flattenRoutes,
      location = _ref2.location;

  // 初始化匹配数组match
  var res = [];
  // 取得路径名，然后将路径分割成每一路由部分.
  // 对每一部分执行一次`getBreadcrumb()`获取到面包屑名称.
  location.pathname.split('?')[0].split('/').reduce(function (prev, curSection) {
    // 将最后一个路由部分与当前部分合并，比如当路径为 `/x/xx/xxx` 时，pathSection分别检查 `/x` `/x/xx` `/x/xx/xxx` 的匹配，并分别生成面包屑
    var pathSection = prev + '/' + curSection;
    var breadcrumb = getBreadcrumb({
      flattenRoutes: flattenRoutes,
      curSection: curSection,
      pathSection: pathSection
    });

    // 将面包屑导入到 res 数组中
    res.push(breadcrumb);

    // 传递给下一次reduce的路径部分
    return pathSection;
  });

  return res;
};

// 将面包屑组件封装成高阶函数，方便自定义面包屑样式展示

exports.default = function () {
  var location = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.location;
  var routes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return function (Component) {
    var BreadComponent = _react2.default.createElement(Component, {
      breadcrumbs: getBreadcrumbs({
        flattenRoutes: flattenRoutes(routes),
        location: location
      })
    });
    return BreadComponent;
  };
};
//# sourceMappingURL=index.js.map