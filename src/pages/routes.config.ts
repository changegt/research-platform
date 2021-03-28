import ds from '../../config/defaultSettings';

type IRouteItem = {
  path: string;
  name: string;
  icon?: string;
  component: string;
};

export default [
  {
    path: ds.pagePrefix,
    redirect: `${ds.pagePrefix}/index`,
  },
  {
    path: 'home',
    name: '首页',
    icon: 'iconhome',
    component: '@/pages/Home',
  },
  {
    path: 'project',
    name: '科研项目',
    icon: 'iconexperiment',
    component: '@/pages/Page1',
  },
  {
    path: 'crf',
    name: 'CRF管理',
    icon: 'iconfiledone',
    component: '@/pages/Page1',
  },
  {
    path: 'dics',
    name: '数据字典',
    icon: 'iconbook',
    component: '@/pages/Page1',
  },
  /** {{routes: 标志位不可删除，用于初始化页面}}  */
] as IRouteItem[];
