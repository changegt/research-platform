import React from 'react';
import { Menu, Dropdown, Avatar, Typography, Spin } from 'antd';
import { UserOutlined, LogoutOutlined, LoginOutlined } from '@ant-design/icons';

export interface IProps {
  /* 昵称 */
  nickName?: string;
  /* 头像 */
  avatarUrl?: string;
  /* 下拉操作项点击回调 */
  onClick?: (key: string, record?: any) => void;
  /* 是否正在加载用户资源 */
  loading?: boolean;
  /* 额外扩展项 */
  extraMenus?: IOperateMenuItem[];
  /** 是否登陆 */
  isLogin?: boolean;
  /* 扩展 */
  [key: string]: any;
}

export type IOperateMenuItem = {
  /* 关键key */
  key: string;
  /* 显示 title */
  title?: string;
  /* icon */
  icon?: React.ReactDOM;

  [key: string]: any;
};

/**
 * Header-用户模块
 * @description 主要是登录用户模块和一切操作项
 * @create 2020-12-16 11:20
 *
 * 分离 onLogin 和 onLogout 操作原因：后面对接SSO等系统的时候，登录页面可能使得独立的，而不是集成在业务中，所以事件回调让组件更加扩展
 */
const UserBox = (props: IProps) => {
  const {
    nickName,
    avatarUrl,
    onClick = () => {},
    extraMenus = [],
    loading,
    isLogin,
  } = props;
  // const isLogin = !!nickName;

  // menu 点击回调
  const handleClickMenu = (record: any) => {
    const { key } = record as { key: string };

    onClick?.(key, record);
  };

  // 渲染操作栏
  const renderLoginMenu = () => {
    return (
      <Menu onClick={handleClickMenu}>
        <Menu.Item key="profile" icon={<UserOutlined />}>
          <span>
            {isLogin ? (
              nickName
            ) : (
              <Typography.Text disabled>未登录用户</Typography.Text>
            )}
          </span>
        </Menu.Item>

        {extraMenus.map((el) => (
          <Menu.Item key={el.key} icon={el.icon}>
            <span>{el.title}</span>
          </Menu.Item>
        ))}

        {isLogin ? (
          <Menu.Item key="logout" icon={<LogoutOutlined />}>
            <a>退出登录</a>
          </Menu.Item>
        ) : (
          <Menu.Item key="login" icon={<LoginOutlined />}>
            <a>立即登录</a>
          </Menu.Item>
        )}
      </Menu>
    );
  };

  return (
    <Dropdown overlay={renderLoginMenu()} placement="bottomRight">
      {loading ? (
        <Spin size="small" />
      ) : (
        <Avatar shape="circle" src={avatarUrl} />
      )}
    </Dropdown>
  );
};

UserBox.defaultProps = {
  avatarUrl:
    'https://img.alicdn.com/tfs/TB1YTUYd4vbeK8jSZPfXXariXXa-320-320.jpg',
  loading: false,
};

export default UserBox;
