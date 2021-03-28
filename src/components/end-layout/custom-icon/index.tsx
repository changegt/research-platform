// custom icon
// @author CAIHUAZHI <moyan@come-future.com>
// @create 2020/09/01 22:57
// https://www.iconfont.cn/manage/index?manage_type=myprojects&projectId=2040858
import React, { useMemo } from 'react';
import { createFromIconfontCN } from '@ant-design/icons';
import { IconFontProps } from '@ant-design/icons/lib/components/IconFont';

export interface IProps extends IconFontProps {
  /** icon 类型 */
  type: string;

  scriptUrl?: string;

  /** 颜色 */
  color?: string;

  /** 字体大小 */
  fontSize?: string;
}

const TargetCustomIcon = (props: IProps) => {
  const {
    color,
    fontSize,
    scriptUrl = '//at.alicdn.com/t/font_2277310_gwe6800yxwu.js',
    style,
    ...rest
  } = props;

  const CustomIcon = useMemo(() => {
    return createFromIconfontCN({
      scriptUrl,
    });
  }, [scriptUrl]);

  const iconStyle = Object.assign(
    {
      color,
      fontSize,
    },
    style,
  );

  return <CustomIcon className="fe-custom-icon" style={iconStyle} {...rest} />;
};

export default TargetCustomIcon;
