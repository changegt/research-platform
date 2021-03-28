import React, { useState } from 'react';
import { Layout, Spin } from 'antd';
import NavMenu from './nav-menu';

import { localMap } from '../_utils';

import './index.less';

export type IMenuItem = {
  /* key */
  key: string;
  /* 路由 */
  path: string;
  /* 路由名称 */
  name?: string;
  /* icon */
  icon?: string | React.ReactNode;
  /* 是否可用 */
  disabled?: boolean;
  /* 子路由 */
  children?: IMenuItem[];
  /* 是否影藏节点 */
  hideInMenu?: boolean;

  /* 是否隐藏子节点 */
  hideChildrenInMenu?: boolean;
  /* 父节点 key */
  parentKeys?: string[];

  [key: string]: any;
};

export interface IProps {
  /* 是否loading，主要是和权限接口配合使用 */
  loading?: boolean;
  /* siderMenu 主题 */
  theme?: 'light' | 'dark';
  /* 默认 width */
  width?: number;
  /* 折叠 width */
  collapsedWidth?: number;
  /* 路由数据 */
  menuData: IMenuItem[];
  // 当前匹配的路由
  mathPath: string;
  /** history 对象 */
  history: {
    push: (path: string) => void;
    [key: string]: any;
  };
  /** custom-icon scriptUrl */
  scriptUrl?: string;
}

/**
 * siderMenu
 * @description 侧边栏组件
 * @create 2020-12-16 18:07
 */
const SiderMenu = (props: IProps) => {
  const { mathPath, history, scriptUrl } = props;
  const { loading, theme, width, collapsedWidth, menuData } = props;

  const [collapsed, setCollapsed] = useState<boolean>(
    localStorage.getItem(localMap.localCollapseKey) === '1',
  );

  // 折叠操作
  const handleCollapse = () => {
    localStorage.setItem(localMap.localCollapseKey, !collapsed ? '1' : '0');
    setCollapsed(!collapsed);
  };

  const navMenuProps = {
    menuData,
    selectedPath: mathPath,
    history,
    scriptUrl,
  };

  return (
    <Layout.Sider
      className="base-layout-slider"
      theme={theme}
      collapsible
      collapsed={collapsed}
      onCollapse={handleCollapse}
      width={width}
      collapsedWidth={collapsedWidth}
    >
      {loading ? (
        <div className="app-slider-indicator">
          <Spin
            tip={collapsed ? '' : '菜单加载中…'}
            size={collapsed ? 'small' : 'default'}
          />
        </div>
      ) : (
        <NavMenu {...navMenuProps} />
      )}
    </Layout.Sider>
  );
};

export default SiderMenu;
