import { Component } from 'react'
import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import {observer, inject} from "mobx-react";
import * as ol from "ol";
import View from "ol/View";
import Map from "ol/Map";
import TileLayer from 'ol/layer/Tile.js';
import {OSM, TileDebug} from 'ol/source.js';
import {fromLonLat} from 'ol/proj.js';

import BingMaps from 'ol/source/BingMaps.js';
import Projection from "ol/proj/Projection";
import {addProjection, addCoordinateTransforms, transform} from 'ol/proj.js';


//action
import OlMapAction from "./OlMapAction";

import axios from 'axios'
import * as dat from 'dat.gui';
import moment from 'moment'
//! 风场
import OlWindy from '../../olwindy'
@withRouter
@inject("OlMapStore", "OlMapAction")
@observer
class OlMap extends Component{

    constructor(props){
        super(props)

        this.init();

        setInterval(this.props.OlMapAction.ShowHideSwitch.bind(this.props.OlMapAction), 2000);
    }

    componentDidMount() {

        //! 绑定
        this.map.setTarget(this.props.id);
    }

    componentWillMount() {
    }

    init(){

        this.view = new View({
            //center: center,
            center: transform(this.props.center, 'EPSG:4326', 'EPSG:3857'),
            zoom: 4,
            projection: 'EPSG:3857'
            // maxZoom:15,
            // minZoom:8
        });


        var osmSource = new OSM();
        this.map = new Map({
            layers: [
                new TileLayer({
                    layerName: 'baseLayer',
                    preload: 4,
                    source: new OSM({
                        // url: "http://{a-c}.sm.mapstack.stamen.com/" +
                        // "(toner-lite,$fff[difference],$fff[@23],$fff[hsl-saturation@20])/" +
                        // "{z}/{x}/{y}.png"
                        url: 'http://mt2.google.cn/vt/lyrs=y&hl=zh-CN&gl=CN&src=app&x={x}&y={y}&z={z}&s=G'
                    })
                })
            ],
            target: 'map',
            view: new View({
                center: fromLonLat([-0.1275, 51.507222]),
                zoom: 10
            })
        });
        var ol = ol;
        var map = this.map;
        var wind, data;
        var realtime = false;
        axios.get(realtime ? '../server/public/parseData/2018090706.json' : './out.json', {
            params: {
                time: moment('20180622')
            }
        }).then(function (res) {
            if (res.data) {
                data = res.data;

                var config = {
                    minVelocity: 0, // 粒子强度最小的速度 (m/s)
                    maxVelocity: 10, // 粒子强度最大的速度 (m/s)
                    velocityScale: 0.05, // 风速的比例
                    particleAge: 90, // 重绘之前生成的离子数量的最大帧数
                    lineWidth: 1, // 绘制粒子的线宽
                    particleMultiplier: 0.01, // 离子数量
                };

                wind = new OlWindy(data, {
                    layerName: 'data',
                    projection: 'EPSG:4326',
                    devicePixelRatio: window.devicePixelRatio,
                    map: map,
                    colorScale: [
                        "rgb(36,104, 180)",
                        "rgb(60,157, 194)",
                        "rgb(128,205,193 )",
                        "rgb(151,218,168 )",
                        "rgb(198,231,181)",
                        "rgb(238,247,217)",
                        "rgb(255,238,159)",
                        "rgb(252,217,125)",
                        "rgb(255,182,100)",
                        "rgb(252,150,75)",
                        "rgb(250,112,52)",
                        "rgb(245,64,32)",
                        "rgb(237,45,28)",
                        "rgb(220,24,32)",
                        "rgb(180,0,35)"
                    ],
                    minVelocity: 0,
                    maxVelocity: 10,
                    velocityScale: 0.05,
                    particleAge: 90,
                    lineWidth: 1,
                    particleMultiplier: 0.01,
                });

                const gui = new dat.GUI();
                gui.add(config, 'minVelocity', 0, 10).onChange(function (value) {
                    wind.updateParams(config);
                });
                gui.add(config, 'maxVelocity', 1, 15).onChange(function (value) {
                    wind.updateParams(config);
                });
                gui.add(config, 'velocityScale', 0.05, 0.1).step(0.01).onChange(function (value) {
                    wind.updateParams(config);
                });
                gui.add(config, 'particleAge', 0, 180).onChange(function (value) {
                    wind.updateParams(config);
                });
                gui.add(config, 'lineWidth', 1, 10).onChange(function (value) {
                    wind.updateParams(config);
                });
                gui.add(config, 'particleMultiplier', 0.01, 0.05).step(0.01).onFinishChange(function (value) {
                    wind.updateParams(config);
                });

                map.on('pointermove', function (event) {
                    var _data = wind.getPointData(transform(event.coordinate, map.getView().getProjection(), 'EPSG:4326'));
                    // console.log(_data);
                });

                wind.appendTo(map);
            }
        });



    }


    render(){
        const {OlMapStore} = this.props;
        return (
            <div style={{...this.props.style}}>

                <div style={{position:'absolute',top:50,bottom:0,right:0,left:0}} id="olmap" />
                <div> <p>{this.props.OlMapStore.isShow ? "true" : "false"}</p> </div>

            </div>
        )
    }
}

export default OlMap
