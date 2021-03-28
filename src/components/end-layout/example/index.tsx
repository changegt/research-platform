// demo entry
// @author afang.yyf <yaoyongfang@come-future.com>
// @create 2020-12-30T08:01:30.330Z

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Link, useHistory } from 'react-router-dom';
import Layout from '../index';
import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import { IMenuItem } from '../sider-menu/index';
import { doLogoutApi, queryUserInfoApi, queryAllSystem } from './service';

import './index.less';

const { BusLayout } = Layout;

function App(props: any) {
  const history = useHistory();
  const menuData = [
    {
      path: '/',
      name: '页面1',
      icon: <AndroidOutlined />,
      children: [
        {
          name: '页面1',
          icon: <AppleOutlined />,
          path: '/page1',
        },
        {
          name: '页面2',
          icon: <AppleOutlined />,
          path: '/page2',
        },
      ],
    },
  ] as IMenuItem[];

  // const headerProps = {
  //   isLogin: true,
  //   userProps: {
  //     nickName: 'yyf'
  //   }
  // } as IHeaderProps;

  return (
    <BusLayout
      // siderMenuProps={{ menuData, mathPath: props.location.pathname, history }}
      // headerProps={headerProps}
      userApi={queryUserInfoApi}
      logoutApi={doLogoutApi}
      systemApi={queryAllSystem}
      title="test"
      logo=""
      pagePrefix=""
      copyright="2020"
      history={history}
      location={window.location}
      routes={menuData}
    >
      <Link to="/page1">page1</Link>
      <Link to="/page2">page2</Link>

      <Route path="/page1" name="" component={Page1} />
      <Route path="/page2" name="" component={Page2} />
    </BusLayout>
  );
}

function Page1() {
  return <div style={{ background: 'red', height: '700px' }}>page1</div>;
}

function Page2() {
  return <div>page2</div>;
}

ReactDOM.render(
  <HashRouter>
    <Route path="/" component={App} />
  </HashRouter>,
  document.getElementById('root'),
);
