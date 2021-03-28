import React from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import md5 from 'md5';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import FELayout from '@/components/end-layout';
import { postRequest } from '../request/bus-request';

import './index.less';

const { Footer } = FELayout;

// 导出合并后的 Store State 类型 TODO
export interface IConnectState {
  [key: string]: any;
}

export interface IProps {
  /** 登录接口 */
  api: string;

  /** title */
  title: string;

  /** logo */
  logo: string;

  /** copyright */
  copyright: string;

  /** 发送登录操作 */
  onLogin?: (token: string) => void;

  /** 属性描述 */
  [key: string]: any;
}

/**
 * 登录页面
 * @description 登录页面
 * @author yyf
 * @create 2020-12-17 00:47
 */
const LoginPage = (props: IProps) => {
  const { api, title, logo, copyright, onLogin } = props;

  const onFinish = (values: { username: string; password: string }) => {
    // 登录操作
    postRequest(api, {
      data: {
        username: values.username,
        password: md5(`${values.username}${values.password}`),
      },
    })
      .then((resp) => {
        if (!resp) {
          return;
        }

        const { token } = (resp.data || {}) as { token: string };

        localStorage.setItem('FE_BACKEND_LOGIN_TOKEN', token);
        onLogin && onLogin(token);
      })
      .catch((resp) => {
        message.error(resp.errorMsg);
      });
  };

  return (
    <div className="login-wrap">
      <h1 className="login-title">
        <img src={logo} alt="logo" className="login-logo" />
        {title}
      </h1>

      <Form
        className="login-form"
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input
            className="login-username"
            placeholder="请输入用户名"
            prefix={<UserOutlined />}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password
            className="login-password"
            placeholder="请输入密码"
            prefix={<LockOutlined />}
          />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>记住密码</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            className="login-submit"
            type="primary"
            htmlType="submit"
            loading={props.loginLoading}
          >
            登录
          </Button>
        </Form.Item>
      </Form>

      <Footer copyright={copyright} />
    </div>
  );
};

export default LoginPage;
