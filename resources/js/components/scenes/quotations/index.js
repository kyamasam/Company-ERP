import React, { Component } from 'react';
import TopNav from "../layouts/topNav";
import SideNav from "../layouts/sideNav";
import RightNav from "../layouts/rightNav";
import Content from "./components/content";

export default class Quotations extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        var scripts_array=[
            '/js/jquery.dashboard_3.js',
            '/js/jquery.core.js',
            '/assets/js/jquery.app.js',
            '/plugins/ladda-buttons/js/spin.min.js',
            '/plugins/ladda-buttons/js/ladda.min.js',
            '/assets/js/labda-buttons-ctrl.js',
        ];

        for(var i=0; i< scripts_array.length ;i++) {
            const script = document.createElement("script");
            script.src = scripts_array[i];
            script.async = true;
            document.body.appendChild(script);
        }

        var styles_array=[
            '/plugins/ladda-buttons/css/ladda-themeless.min.css',
        ];
        for(var j=0;j<styles_array.length;j++){
            var head=document.getElementsByTagName('head')[0];
            const style=document.createElement("link");
            style.href= styles_array[j];
            style.rel='stylesheet';
            style.type='text/css';
            head.appendChild(style);
        }
    }
    render() {
        return (
            <div id="wrapper">
                <TopNav/>
                <SideNav/>
                <Content{...this.props}/>
                <RightNav/>
            </div>
        );
    }
}