import React, { useMemo } from 'react';
import { Menu } from 'antd';

import CustomIcon from '../custom-icon';
import { IMenuItem } from './index';

import './index.less';

export interface IProps {
  /* menu 数据 */
  menuData: IMenuItem[];
  /* 当前选中的路由 */
  selectedPath: string;
  /* mode 属性 */
  mode?: 'inline' | 'horizontal' | 'vertical';
  /** custom-icon scriptUrl */
  scriptUrl?: string;
  /* 点击事件 */
  onClick?: (record: IMenuItem) => void;
  /** history 对象 */
  history: {
    push: (path: string) => void;
    [key: string]: any;
  };
}

export type IOptions = {
  key?: string;
  icon?: string | React.ReactNode;
  onClick?: (key: IMenuItem) => void;
};

/**
 * menu菜单
 * @description menu菜单
 * @author yyf
 * @create 2020-12-16 21:04
 */
const NavMenu = (props: IProps) => {
  const {
    mode = 'inline',
    menuData = [],
    selectedPath,
    scriptUrl,
    onClick = () => {},
    history,
  } = props;

  // 节点渲染
  const renderMenuNode = (item: IMenuItem, options: IOptions) => {
    const menuNode = item.path ? (
      <a onClick={() => history.push(item.path)}>{item.name}</a>
    ) : (
      <span>{item.name}</span>
    );

    return (
      <Menu.Item
        {...options}
        icon={
          typeof item.icon === 'string' ? (
            <CustomIcon
              scriptUrl={scriptUrl}
              fontSize="18px"
              type={item.icon}
            />
          ) : (
            item.icon
          )
        }
        disabled={item.disabled || false}
        onClick={() => options.onClick(item)}
      >
        {menuNode}
      </Menu.Item>
    );
  };

  // 菜单展开目录
  const defaultOpenKeys = useMemo(() => {
    const arr = selectedPath.split('/');
    const target = ['/'];

    arr.reduce(
      (previousValue: string, currentValue: string, currentIndex: number) => {
        const curPath =
          currentIndex === 0 ? '/' : `${previousValue}/${currentValue}`;
        target.push(curPath);

        return curPath;
      },
    );

    return target;
  }, [selectedPath]);

  return (
    <Menu
      selectedKeys={[selectedPath]}
      defaultOpenKeys={defaultOpenKeys}
      mode={mode}
      className="fe-sider-navmenu"
      style={{
        borderRight: 'none',
      }}
    >
      {menuData.map((item, index) => {
        if (item.hideInMenu) return null;

        if (item.children && item.children.length) {
          return (
            <Menu.SubMenu
              key={item.key || item.path || index}
              icon={
                typeof item.icon === 'string' ? (
                  <CustomIcon
                    scriptUrl={scriptUrl}
                    fontSize="18px"
                    type={item.icon}
                  />
                ) : (
                  item.icon
                )
              }
              title={item.name}
            >
              {item.children?.map((subItem, subIndex) => {
                if (subItem.hideInMenu) return null;

                return renderMenuNode(subItem, {
                  key: subItem.key || subItem.path || `lv1_${subIndex}`,
                  onClick: () => onClick(subItem),
                });
              })}
            </Menu.SubMenu>
          );
        }

        return renderMenuNode(item, {
          key: item.key || item.path || `lv0_${index}`,
          icon: item.icon,
          onClick: () => onClick(item),
        });
      })}
    </Menu>
  );
};

export default NavMenu;
