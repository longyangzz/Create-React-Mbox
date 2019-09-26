import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route } from 'react-router-dom'

import './index.css';

import Mainwindow  from './Mainwindow'
import { Game } from './component/Game'

import { Provider } from 'mobx-react'
import { AppContainer } from 'react-hot-loader'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'

import inject from "./inject"

const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Provider {...inject}>
                <LocaleProvider locale={zhCN}>
                    <Component />
                </LocaleProvider>
            </Provider>
        </AppContainer>,
        document.getElementById('root')
    )
}

render(Mainwindow)


