import React, {
  useCallback,
  useState,
  useEffect,
  useMemo,
  FunctionComponent,
} from 'react';
import BaseLayout, { IProps as layoutProps } from '../base-layout';
import { createRequest } from '../../request/service';
import request, {
  requestConf,
  LOGIN_INVALID_CODE,
  doRedirectToLogin,
} from '../../request/bus-request';
import { IMenuItem } from '../sider-menu';
import { appItem as IAppItem } from '../global-menu';
import PageLoading from '../loading';
import { parse } from 'qs';

export type IUser = {
  nickName?: string;
  avatarUrl?: string;
};

// 用户信息context
export const UserInfoContext = React.createContext<IUser>({
  nickName: '',
  avatarUrl: '',
});

export interface IComponent extends FunctionComponent {
  getInitialProps?: FunctionComponent;
  preload?: () => Promise<any>;
}

export interface IRouteProps {
  path?: string;
  exact?: boolean;
  redirect?: string;
  component?: IComponent;
  routes?: IRouteProps[];
  key?: any;
  strict?: boolean;
  sensitive?: boolean;
  wrappers?: any[];
  [k: string]: any;
}

export type IUmiRrops = {
  /** children */
  children: React.ReactNode;
  /** history */
  history: { push: (path: string) => void; [key: string]: any };
  /** location */
  location?: Location;
  /** routes */
  routes: IRouteProps[];

  [key: string]: any;
};

export interface IProps extends IUmiRrops, layoutProps {
  /** 是否开启登录模块, 默认值 true */
  isOpenLogin?: boolean;
  // api
  /** user api */
  userApi: string;
  /** logout api */
  logoutApi: string;
  /** 系统列表 api */
  systemApi: string;

  // defaultSettings
  /** title */
  title: string;
  /** logo */
  logo: string;
  /** pagePrefix */
  pagePrefix: string;
  /** copyright */
  copyright: string;
  /** 登录页面地址 */
  loginUrl?: string;
}

// 前置脚本，主要用于设置 k1, k2，用于对接his业务
const FE_BACKEND_LOGIN_K1 = 'FE_BACKEND_LOGIN_K1';
const FE_BACKEND_LOGIN_K2 = 'FE_BACKEND_LOGIN_K2';
const { k: kVal = '' } = parse(window.location.search.slice(1));
const [k1, k2]: string[] = (kVal as string).split('-');
if (k1) localStorage.setItem(FE_BACKEND_LOGIN_K1, k1);
if (k2) localStorage.setItem(FE_BACKEND_LOGIN_K2, k2);

/**
 * layout
 */
export default (props: IProps) => {
  const {
    isOpenLogin = true,
    history,
    routes,
    userApi,
    logoutApi,
    systemApi,
    title,
    logo,
    pagePrefix,
    copyright,
    headerProps,
    siderMenuProps,
    footerProps,
    loginUrl,
    ...restProps
  } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [curUser, setCurUser] = useState<IUser>({});
  const [isLogined, setIsLogined] = useState<boolean>(false);
  const [systemLists, setSystemLists] = useState<IAppItem[]>([]);
  const [iconScriptUrl, setIconScriptUrl] = useState<string>();
  const [globalMenuTitle, setGlobalMenuTitle] = useState<string>();

  // 获取用户信息
  const doQueryUser = async () => {
    setLoading(true);
    const resp = await createRequest({
      ...requestConf,
      // 改写 successFunc，主要是处理错误提示
      successFunc: (response) => {
        if (response.success) {
          return true;
        }
        // 状态过期处理 102 为统一状态过期标识符
        if (response && response.code === LOGIN_INVALID_CODE) {
          // 跳转登录 此处不需要提示，优化交互体验
          // message.error(response.errorMsg || '登录过期');

          setTimeout(() => {
            doRedirectToLogin(loginUrl);
          }, 500);
        }
        return false;
      },
    })(userApi);

    setLoading(false);
    if (!resp.success) {
      return;
    }

    setCurUser(resp.data as IUser);
    setIsLogined(true);

    doQuerySystems();
  };

  // 获取系统数据
  const doQuerySystems = async () => {
    const resp = await request(systemApi);
    const { data } = resp || {};

    if (!data) {
      return;
    }

    if (data && data.appList) {
      setSystemLists(data.appList);
      setGlobalMenuTitle(data.title);
      setIconScriptUrl(data.iconScriptUrl);
    }
  };

  useEffect(() => {
    isOpenLogin && doQueryUser();
  }, []);

  // 处理后的 menuData 数据
  const menuData = useMemo(() => {
    const curRootRoute: IRouteProps | undefined = routes.find(
      (el) => el.path === pagePrefix,
    );
    const targetMenu = transfer(curRootRoute?.routes || []);

    return targetMenu.filter((el) => {
      // 移除没有 name 字段的
      if (!el.name) {
        return false;
      }

      // 权限 TODO

      return true;
    });
  }, [props.routes]);

  // 头像处操作栏点击
  const handleClickHeader = useCallback(async (key) => {
    if (key === 'logout') {
      // 退出登录操作
      await request(logoutApi);

      doRedirectToLogin(loginUrl);
    }

    // profile TODO
  }, []);

  return loading ? (
    <PageLoading />
  ) : (
    <UserInfoContext.Provider value={{ ...curUser }}>
      <BaseLayout
        {...restProps}
        siderMenuProps={{
          menuData,
          mathPath: props.location.pathname,
          history,
          ...siderMenuProps,
        }}
        headerProps={{
          isLogin: true,
          title,
          logo,
          customUserBox: !isOpenLogin ? null : undefined, // 若不需要登录模块的话，默认去除头部右侧用户模块
          userProps: {
            ...curUser,
            onClick: handleClickHeader,
          },
          systemLists,
          iconScriptUrl,
          globalMenuTitle,
          ...headerProps,
        }}
        footerProps={{
          copyright,
          ...footerProps,
        }}
      >
        {/* 用户已经登录 || 不开启登录模块 */}
        {(isLogined || !isOpenLogin) && props.children}
      </BaseLayout>
    </UserInfoContext.Provider>
  );
};

// 转化
function transfer(routes: IRouteProps[]): IMenuItem[] {
  return routes.map(
    (el) =>
      ({
        ...el,
        key: el.key || el.path,
        path: el.path,
        name: el.name,
        icon: el.icon,
        children: el.routes ? transfer(el.routes) : [],
      } as IMenuItem),
  );
}
