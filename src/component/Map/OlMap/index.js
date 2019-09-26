import { Component } from 'react'
import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import {observer, inject} from "mobx-react";

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

@withRouter
@inject("OlMapStore", "OlMapAction")
@observer
class OlMap extends Component{

    constructor(props){
        debugger
        super(props)

        this.init();

        setInterval(this.props.OlMapAction.ShowHideSwitch.bind(this.props.OlMapAction), 2000);
    }

    componentDidMount() {
        debugger

        //! 绑定
        this.map.setTarget(this.props.id);
    }

    componentWillMount() {
        debugger
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
                    source: osmSource,
                    visible: true
                }),
                new TileLayer({
                    source: new TileDebug({
                        projection: 'EPSG:3857',
                        tileGrid: osmSource.getTileGrid()
                    })
                })
            ],
            target: 'map',
            view: new View({
                center: fromLonLat([-0.1275, 51.507222]),
                zoom: 10
            })
        });


    }

    render(){
        const {OlMapStore} = this.props;
        debugger
        return (
            <div style={{...this.props.style}}>

                <div style={{position:'absolute',top:50,bottom:0,right:0,left:0}} id="olmap" />
                <div> <p>{this.props.OlMapStore.isShow ? "true" : "false"}</p> </div>

            </div>
        )
    }
}

export default OlMap
