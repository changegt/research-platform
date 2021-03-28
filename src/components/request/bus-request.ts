import { message } from 'antd';
import { createRequest, createRequstConf } from '../request/service';

export const FE_BACKEND_LOGIN_TOKEN = 'FE_BACKEND_LOGIN_TOKEN';
/** 登陆失效的code */
export const LOGIN_INVALID_CODE = 102;
/** 跳转重定向地址 */
export const REDIRECT_LOGIN_URL = '/user_module/login';
/** 重定向值登录页面 */
export const doRedirectToLogin = (loginUrl?: string) => {
  window.location.href = `${
    loginUrl || REDIRECT_LOGIN_URL
  }?redirect=${encodeURIComponent(window.location.href)}`;
};

export const requestConf: createRequstConf = {
  parsePrmFun: (params) => {
    const { headers } = params || {};
    return {
      ...params,
      headers: Object.assign(
        {
          token: localStorage.getItem(FE_BACKEND_LOGIN_TOKEN) || '',
          Authorization: localStorage.getItem(FE_BACKEND_LOGIN_TOKEN) || '',
        },
        headers,
      ),
    };
  },
  successFunc: (response) => {
    if (response.success) {
      return true;
    }
    // 状态过期处理 102 为统一状态过期标识符
    if (response && response.code === LOGIN_INVALID_CODE) {
      // 跳转登录
      message.error(response.errorMsg || '登录过期');

      setTimeout(() => {
        doRedirectToLogin();
      }, 500);
    }
    return false;
  },
};

/**
 * 统一调用方法
 * @description request 统一调用方法，涉及到权限，统一参数等等
 * @create 2020-12-15 17:36
 */
const request = createRequest(requestConf);
export const getRequest = request;
export const postRequest = createRequest(
  Object.assign(
    {
      method: 'POST',
    },
    requestConf,
  ) as createRequstConf,
);

export default request;
