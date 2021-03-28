import React, { Fragment } from 'react';
import SiderMenu from '../sider-menu';
import Header from '../header';
import Footer from '../footer';
import { IProps as IHeaderProps } from '../header';
import { IProps as ISiderMenuProps } from '../sider-menu';
import { IProps as IFooterProps } from '../footer';
import './index.less';

export interface IProps {
  /** header props */
  headerProps?: IHeaderProps;
  /**
   * 侧边栏显隐
   * @default true
   */
  showSiderMenu?: boolean;
  /** sider props */
  siderMenuProps?: ISiderMenuProps;
  /**
   * footer显隐
   * @default true
   */
  showFooter?: boolean;
  /** footer props */
  footerProps?: IFooterProps;
  /** props location */
  location?: Location;
}

/**
 * 基础的容器组件
 * @description 包含了header，sidermenu，footer，content等
 * @author yyf
 * @create 2021-01-27 20:07
 */
const BaseLayout: React.FC<IProps> = (props) => {
  const {
    headerProps,
    siderMenuProps,
    footerProps,
    showSiderMenu = true,
    showFooter = true,
  } = props;

  const curSiderProps = {
    loading: false,
    theme: 'light',
    width: 200,
    collapsedWidth: 60,
    ...siderMenuProps,
  } as ISiderMenuProps;

  return (
    <div className="cf-end-layout">
      <Header {...headerProps} />
      <div className="cf-end-content">
        <Fragment>
          {showSiderMenu && <SiderMenu {...curSiderProps} />}

          <div className="cf-end-inner">
            <div className="cf-end-child">{props.children}</div>

            {showFooter && <Footer {...footerProps} />}
          </div>
        </Fragment>
      </div>
    </div>
  );
};

/**
 * 默认值
 */
BaseLayout.defaultProps = {
  // 属性默认值配置
};

export default BaseLayout;
