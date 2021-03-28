import React from 'react';
import classnames from 'classnames';

/** portal 参数 */
export interface portalParams {
  /** portal 标示 用作layout拦截  */
  portal_mark: 'cf-portal';
  /** 隐藏底部footer */
  portal_hidden_footer?: string;
  /** portal标题 */
  portal_title?: string;
  /** portal src */
  portal_url: string;
  /** portal id */
  portal_id: string;
  /** 剩余参数 */
  [portal_args: string]: string;
}

export const PORTAL_MARK = 'cf-portal';
interface IProps {
  className?: string;
  style?: React.CSSProperties;
  src: string;
}

const prefixCls = 'cf-portal';

const Portal: React.FC<IProps> = ({ src, className, style }) => {
  return (
    <div
      className={classnames(`${prefixCls}-wrapper`, className)}
      style={style}
    >
      <iframe
        name="cfPortal"
        className={`${prefixCls}-frame`}
        src={src}
        frameBorder="0"
        style={{ width: '100%', height: '100%' }}
      ></iframe>
    </div>
  );
};

export default Portal;
