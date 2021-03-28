import React from 'react';
import './index.less';

import loadingImg from './loading.gif';

export interface IProps {
  /** 文字说明 */
  text?: string;
}

/**
 * loading
 * @description 页面loading组件
 * @create 2021-03-03 16:32
 */
const Coms: React.FC<IProps> = (props) => {
  return (
    <div className="fe-end-loading">
      <img src={loadingImg} alt="加载中" />
      &nbsp;&nbsp;{props.text}
    </div>
  );
};

/**
 * 默认值
 */
Coms.defaultProps = {
  // 属性默认值配置
  text: '初始化中...',
};

export default Coms;
