import React, { useCallback } from 'react';
import { message } from 'antd';
import Login, { IProps as ILoginProps } from './index';
import { parse } from 'qs';

/* 用户登录接口 */
export const doLoginApi = '/user_backend/v1/login';
/** 数据中台业务登录页面地址 */
export const loginPageLink = '/user_module/login';

export interface IProps extends Omit<ILoginProps, 'api'> {
  /** 重定向地址 */
  redirect?: string;

  /** 登录接口 */
  api?: string;
}

/**
 * 业务登录页面
 * @description 业务登录页面，绑定了当前数据中台统一登录方案
 * @author afang
 * @create 2021-03-01 15:40
 */
const BusiLogin = (props: IProps) => {
  const onLogin = useCallback(() => {
    message.success('登录成功');
    const { search } = window.location;

    if (!search) {
      // 无参数，跳转默认跳转地址
      setTimeout(() => {
        window.location.href = props.redirect || '/';
      }, 500);
      return;
    }

    // 参数重定向地址 || 默认设置重定向地址
    const { redirect } = parse(search.slice(1));
    const linkUrl = (redirect || props.redirect) as string;

    setTimeout(() => {
      window.location.href = decodeURIComponent(linkUrl);
    }, 500);
  }, []);

  const newProps = {
    ...props,
    onLogin: props.onLogin || onLogin,
  } as ILoginProps;

  return <Login {...newProps} />;
};

/**
 * 默认值
 */
BusiLogin.defaultProps = {
  // 属性默认值配置
  api: doLoginApi,
};

export default BusiLogin;
