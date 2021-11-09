/*
 * @Author: shuyang
 * @Date: 2021-11-06 23:47:24
 * @LastEditTime: 2021-11-07 21:39:45
 * @FilePath: \nextJs_Blog\admin\src\index.tsx
 */
import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import Main from './Pages/Main';

ReactDOM.render(
  // <React.StrictMode>
    <Main />,
  // </React.StrictMode>
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
