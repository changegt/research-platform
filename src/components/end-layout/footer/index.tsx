import React from 'react';
import { Layout } from 'antd';
import { CopyrightOutlined } from '@ant-design/icons';

export interface IProps {
  /* copyright */
  copyright: string;
}

/**
 * footer 组件
 * @description 底部组件，申明 copyright
 * @author yyf
 * @create 2020-12-17 19:36
 */
export default function LayoutFooter(props: IProps) {
  return (
    <Layout.Footer style={{ textAlign: 'center', color: '#999' }}>
      Copyright <CopyrightOutlined /> {props.copyright || ''}
    </Layout.Footer>
  );
}
