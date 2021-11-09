/*
 * @Author: shuyang
 * @Date: 2021-11-06 23:56:20
 * @LastEditTime: 2021-11-07 22:37:33
 * @FilePath: \nextJs_Blog\admin\src\Pages\Main.tsx
 */
import React from 'react'
import { Route,BrowserRouter as Router } from 'react-router-dom'
import Login from './Login'
import AdminIndex from './AdminIndex'
// import AddArticle from './AddArticle'
function Main() {
    return (
        <div>
            {/* main */}
            <Router>
                <Route path='/' exact component={ Login}></Route>
                <Route path='/index/' component={ AdminIndex}></Route>
             </Router>
        </div>
    )
}

export default Main
