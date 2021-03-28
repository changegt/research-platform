import React, { useMemo, useState, useEffect, useCallback } from 'react';
import qs from 'qs';
import { Drawer, Menu } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import { DrawerProps } from 'antd/lib/drawer';
import request from '../../request/bus-request';
import { PORTAL_MARK } from '../portal';

import './index.less';

const { SubMenu } = Menu;

export type appItem = {
  id: string;
  name: string;
  icon: string;
  url: string;
  portal?: boolean;
  portalTitle?: string;
  portalUrl?: string;
  children?: appItem[];
};

/**
 * 接口约束返回
 * {
 *   iconScriptUrl: string;
 *   appList: appItem[]
 * }
 */

export interface IProps {
  width?: React.ReactText;
  title?: string;
  className?: string;
  placement?: 'left' | 'top' | 'right' | 'bottom';
  /** 应用点击事件 */
  onMenuClick?: (menuItem: appItem) => void;
  /** 应用列表 */
  appList?: appItem[];
  /** 应用列表sourceUrl 从接口拉取 */
  appSourceUrl?: string;
  /** 自定义icon配置项 */
  iconSourceOptions?: {
    scriptUrl: string | string[];
    extraCommonProps?: {
      [key: string]: any;
    };
  };
  /** Drawer other props 可覆盖all */
  extraDrawerProps?: DrawerProps;
}

const prefixCls = 'cf-global-menu';

const GlobalMenu: React.FC<IProps> = (props) => {
  const { iconSourceOptions, appList = [], appSourceUrl, onMenuClick } = props;
  const { scriptUrl } = iconSourceOptions || {};
  const [visible, setVisible] = useState<boolean>(false);
  const [menuLists, setMenuLists] = useState<appItem[]>(appList);
  const [iconScriptUrl, setIconScriptUrl] = useState<string | string[]>(
    scriptUrl || '',
  );

  useEffect(() => {
    !appSourceUrl && setMenuLists(appList);
  }, [appList]);

  useEffect(() => {
    scriptUrl && setIconScriptUrl(scriptUrl);
  }, [scriptUrl]);

  useEffect(() => {
    appSourceUrl && getAppList();
  }, []);

  const getAppList = useCallback(() => {
    appSourceUrl &&
      request(appSourceUrl).then((res) => {
        const { data } = res || {};
        const { appList = [], iconScriptUrl } = data || {};
        setMenuLists(appList);
        setIconScriptUrl(iconScriptUrl);
      });
  }, [appSourceUrl]);

  // 点击事件
  const handleClick = useCallback(
    (menuItem: appItem) => {
      if (onMenuClick) {
        onMenuClick?.(menuItem);
        return;
      }

      const { url, portal, portalTitle, portalUrl, id } = menuItem || {};
      if (!url) return;
      if (portal) {
        const searchStr = qs.stringify({
          portal_id: id,
          portal_mark: PORTAL_MARK,
          portal_title: encodeURIComponent(portalTitle),
        });
        window.open(
          `${url}?${searchStr}&portal_url=${encodeURIComponent(portalUrl)}`,
        );
      } else {
        window.open(url);
      }
    },
    [onMenuClick, appList],
  );

  const Icon = useMemo(() => {
    return createFromIconfontCN({
      ...iconSourceOptions,
      scriptUrl: iconScriptUrl,
    });
  }, [iconScriptUrl]);

  const renderMenu = (menuItem: appItem) => {
    if (menuItem.children?.length) {
      return (
        <SubMenu
          key={String(menuItem.id)}
          icon={
            menuItem.icon && (
              <Icon
                type={menuItem.icon}
                style={{
                  fontSize: '16px',
                }}
              />
            )
          }
          title={menuItem.name}
        >
          {menuItem.children.map((el) => renderMenu(el))}
        </SubMenu>
      );
    }

    return (
      <Menu.Item
        className={`${prefixCls}-nav-menu-item`}
        onClick={() => handleClick(menuItem)}
        key={String(menuItem.id)}
      >
        {menuItem.icon && (
          <Icon
            type={menuItem.icon}
            style={{
              fontSize: '16px',
            }}
          />
        )}
        {menuItem.name}
      </Menu.Item>
    );
  };

  return (
    <div className={`${props.className} ${prefixCls}`}>
      <div
        className={`${prefixCls}-header-toggle`}
        onClick={() => setVisible(true)}
      >
        {props.children || (
          <Icon
            type="iconswitch-2"
            style={{
              fontSize: '16px',
            }}
          />
        )}
      </div>
      <Drawer
        className={`${prefixCls}-nav-drawer`}
        title={props.title}
        placement={props.placement}
        width={props.width}
        visible={visible}
        onClose={() => setVisible(false)}
        closable
        {...props.extraDrawerProps}
      >
        <Menu
          className={`${prefixCls}-nav-menu`}
          defaultOpenKeys={menuLists.map((el) => String(el.id))}
          mode="inline"
        >
          {menuLists.map((el) => renderMenu(el))}
        </Menu>
      </Drawer>
    </div>
  );
};

GlobalMenu.defaultProps = {
  title: '全局导航',
  placement: 'left',
  width: 240,
};

export default GlobalMenu;
