import React from 'react';
import { Route, withRouter, Link } from 'react-router-dom';
import Breadcrumbs from './components/Breadcrumbs';

const MyButton = withRouter(props => {
  return (
    <button onClick={() => props.history.push(props.path)}>{props.text}</button>
  );
});

const App = () => {
  return (
    <div>
      {/* 面包屑组件渲染 */}
      <Breadcrumbs />

      {/* 路由链接示例 */}
      <ul>
        <li>
          <Link to="/home">主页</Link>
        </li>
        <li>
          <Link to="/detail">详情</Link>
          <ul>
            <li>
              <Link to="/detail/yesterday">昨日</Link>
              <ul>
                <li>
                  <Link to="/detail/yesterday/1">内容1</Link>
                </li>
                <li>
                  <Link to="/detail/yesterday/2">内容2</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/detail/today">今日</Link>
              <ul>
                <li>
                  <Link to="/detail/today/3">内容3</Link>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
      <MyButton text="关于" path="/about" />

      {/* React-Router对应页面展示 */}
      <Route exact path="/home" render={() => <h2>主页</h2>} />
      <Route exact path="/detail/*" render={() => <h2>详情</h2>} />
      <Route path="/detail/yesterday/1" render={() => <h2>欢迎使用</h2>} />
      <Route
        path="/detail/yesterday/2"
        render={() => <h2>react-router面包屑组件</h2>}
      />
      <Route path="/about" render={() => <h2>关于</h2>} />
    </div>
  );
};

export default App;
