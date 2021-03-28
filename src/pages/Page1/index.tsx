import React, { useEffect, useContext } from 'react';
import FELayout from '@/components/end-layout';
import styles from './index.less';
const { UserInfoContext } = FELayout;

export default function IndexPage() {
  return (
    <div>
      <h1 className={styles.title}>hello</h1>
    </div>
  );
}
