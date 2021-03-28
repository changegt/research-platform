// demo entry
// @author afang.yyf <yaoyongfang@come-future.com>
// @create 2020-12-30T08:01:30.330Z

import React from 'react';
import ReactDOM from 'react-dom';

import Login from '../index';
import './index.less';

function App() {
  return (
    <Login
      api="/user_backend/v1/login"
      logo=""
      title="测试登录"
      copyright="来未来"
      onLogin={() => {}}
    />
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
