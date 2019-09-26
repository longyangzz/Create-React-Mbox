import React from 'react'
import { Link } from 'react-router-dom'
import  OlMap  from "../Map/OlMap"

//! 菜单用来管理地图上的绘制效果，就是通过菜单管理地图的store，store是通过action管理
import OlMapAction from "../Map/OlMap/OlMapAction"

//！样式设置


class Dashboard extends React.Component {

    click(){
        debugger
        OlMapAction.ShowHideSwitch();
    }

    render() {
        debugger
        return (
            <div>
                {/*//！左侧区域*/}
                <Menu />

                {/*//! web地图，中间区域*/}
                <div>
                    <OlMap id='olmap' style={{position:'absolute',top:0,bottom:0,right:0,left:200}} center={[113.588346,28.18577]}/>
                </div>

            </div>
        )
    }
}

class Menu extends React.Component {
    render() {
        debugger
        return (
            <div>
                {/*//！左侧区域*/}
                <div >
                    <h1>App程序</h1>
                    <ul>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/inbox">Inbox</Link></li>
                    </ul>
                </div>
            </div>
        )
    }
}

class About extends React.Component{
    render() {
        return <h3>About</h3>
    }
}

class Inbox extends React.Component {
    render() {
        return (
            <div>
                <h2>"Welcome to your Inbox"</h2>
            </div>
        )
    }
}

class Message extends React.Component {
    render() {
        return <h3>Message {this.props.params.id}</h3>
    }
}

export {About, Dashboard, Inbox, Message}
