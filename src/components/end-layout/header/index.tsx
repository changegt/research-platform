import React from 'react';
// import { Link } from 'react-router-dom';
import GlobalMenu, { appItem as IAppItem } from '../global-menu';
import UserBox, { IProps as IUserBoxProps } from './user-box';
// import 'antd/lib/drawer/style';

import logo from '../assets/logo.png';
import switchIcon from '../assets/switch.svg';
import './index.less';

export interface IProps {
  /** logo */
  logo?: string;

  /** 工程title */
  title?: string | React.ReactDOM;

  /** 是否登陆 */
  isLogin?: boolean;

  /** 自定义扩展操作模块 */
  actions?: React.ReactDOM | string;

  /** 自定义右侧用户模块 null则不启动 userBox 模块 */
  customUserBox?: null | React.ReactDOM;

  /** 用户模块配置 */
  userProps?: IUserBoxProps;

  /** 扩展 className */
  className?: string;

  /** 业务系统 */
  systemLists?: IAppItem[];

  /** global menu title */
  globalMenuTitle?: string;

  /** global-menu icon-url */
  iconScriptUrl?: string;

  /** 容器层 css 样式 */
  style?: CSSStyleSheet;

  /** 是否展示 global-menu */
  isShowGlobalMenu?: boolean;

  [key: string]: any;
}

/**
 * Header 头组件
 * @description Header 头组件
 * @author yyf
 * @create 2020-12-16 11:16
 */
const Header = (props: IProps) => {
  const {
    logo,
    title,
    customUserBox,
    userProps,
    className = '',
    systemLists = [],
    iconScriptUrl,
    globalMenuTitle,
    isLogin,
    actions,
    isShowGlobalMenu,
    style = {},
  } = props;

  return (
    <header className={className} style={style}>
      <div className="header-app">
        {isShowGlobalMenu && (
          <GlobalMenu
            title={globalMenuTitle}
            appList={systemLists as any}
            iconSourceOptions={iconScriptUrl && { scriptUrl: iconScriptUrl }}
          >
            <img
              src={switchIcon}
              alt="切换面板按钮"
              className="header-logo-switch"
            />
          </GlobalMenu>
        )}
        <div className="header-logo">
          <img src={logo} alt="logo" className="header-logo-img" />
        </div>

        {/* <Link to="/">{title}</Link> */}
        {title}
        <span className="header-deivider" />
      </div>

      <span className="header-flex-air" />

      {actions}

      {typeof customUserBox !== 'undefined' ? (
        customUserBox
      ) : (
        <UserBox {...userProps} isLogin={isLogin} />
      )}
    </header>
  );
};

Header.defaultProps = {
  logo,
  title: '后台管理系统',
  actions: '',
  isShowGlobalMenu: false,
};

export default Header;
