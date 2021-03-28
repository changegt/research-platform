// 404错误页面
// @author Pluto <huarse@gmail.com>
// @create 2018/05/22

import React from 'react';
import './index.less';

export default function Page404() {
  // useEffect(() => {
  //   const timmer = setTimeout(() => {location.href = '/'}, 3000);
  //   return () => clearTimeout(timmer);
  // });

  return (
    <div className="error-page-container">
      {/* <div className="error-page-imgbox">
        <img src="https://img.alicdn.com/tfs/TB1A.pUmhtnkeRjSZSgXXXAuXXa-240-128.svg" alt=""/>
      </div> */}
      <h2>NOT FOUND</h2>
      <p>页面去火星啦~</p>
    </div>
  );
}
