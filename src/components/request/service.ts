import { extend, RequestOptionsInit } from 'umi-request';
import { message } from 'antd';

// 错误提示集合
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
} as { [key: number]: string };

// 异常处理程序
const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    // 接口异常
    message.error(errorText);
  } else if (!response) {
    // 网络异常
    message.error('网络异常');
  }

  return response;
};

/** 配置request请求时的默认参数 */
export const requestInstance = extend({
  /** 默认错误处理 */
  errorHandler,
  /** 默认请求是否带上cookie */
  credentials: 'include',
});

/** 接口返回格式 */
export type IResponse<R = any> = {
  success: boolean;
  errorMsg: string;
  /** 失败的错误码 */
  code: number;
  /** 请求返回数据 */
  data: R;
};

export interface IRequestParams extends RequestOptionsInit {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'OPTION';
  data?: Record<string, any>;
}

export const request = <R = any>(url: string, params?: IRequestParams) => {
  const { headers, data, method = 'GET', ...restParams } = params || {};

  const paramsKey = method === 'GET' ? 'params' : 'data';

  return requestInstance<IResponse<R>>(url, {
    method,
    headers,
    [paramsKey]: data,
    ...restParams,
  });
};

export interface createRequstConf {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'OPTION';
  /** 请求参数parse */
  parsePrmFun?: (params?: IRequestParams) => IRequestParams;
  /** 调用成功的回调 */
  successFunc?: (res: IResponse) => boolean;
  /** 调用失败 */
  errorFunc?: (rej: IResponse) => void;
}

export const createRequest = (params: createRequstConf = {}) => {
  const { method, successFunc, errorFunc, parsePrmFun = (any) => any } = params;
  return <R = any>(url: string, params?: IRequestParams) =>
    new Promise<IResponse<R>>((resolve, reject) => {
      request<R>(url, {
        method,
        ...parsePrmFun(params),
      })
        .then((response) => {
          if (successFunc) {
            successFunc(response) ? resolve(response) : reject(response);
          } else {
            resolve(response);
          }
        })
        .catch((rej) => {
          errorFunc?.(rej);
          reject(rej);
        });
    });
};
