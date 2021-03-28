import { createRequest, createRequstConf, IRequestParams } from './service';
export { createRequest };
export type { IRequestParams, createRequstConf };

const requestConf: createRequstConf = {
  successFunc: (response) => {
    if (response.success) {
      return true;
    }
    return false;
  },
};

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
