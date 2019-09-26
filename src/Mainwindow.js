import React from 'react';
import { Component } from 'react'
import { HashRouter as Router, Route, Switch, withRouter } from 'react-router-dom'

import {About, Dashboard, Inbox, Message} from "./component/TestRouter"
import { OlMap } from "./component/Map/OlMap"
/**
 * 路由按需加载，初始化时候配置路由，登录路由和其它页面路由
 */
class Mainwindow extends React.Component {
    render () {
        debugger
        return (
            <div>
                <Router>
                    {/*<Switch>*/}
                        {/*<Route path="/" component={<OlMap id='map1' style={{position:'absolute',top:0,bottom:0,right:0,left:0}} center={[113.588346,28.18577]}/>} />*/}
                        <Route path="/" component={Dashboard} />
                        <Route path="/about" component={About} />
                        <Route path="/inbox" component={Inbox} />
                    {/*</Switch>*/}
                </Router>
            </div>

        )
    }
}

export default Mainwindow
