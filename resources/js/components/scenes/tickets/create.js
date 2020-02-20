import React, { Component } from 'react';
import TopNav from "../layouts/topNav";
import SideNav from "../layouts/sideNav";
import RightNav from "../layouts/rightNav";
import Content from "./components/ticket_create";

export default class TicketCreate extends Component {
    constructor(props){
        super(props);

    }

    componentDidMount(){
        var scripts_array=[
            '/js/jquery.core.js',
            '/assets/js/jquery.app.js',
            '/plugins/jquery.steps/js/jquery.steps.min.js',
            '/plugins/jquery-validation/js/jquery.validate.min.js',
            '/plugins/select2/js/select2.min.js',
        ];

        var styles_array=[
            "/plugins/jquery.steps/css/jquery.steps.css",
            "/plugins/select2/css/select2.min.css"
        ];
        for(var j=0;j<styles_array.length;j++){
            var head=document.getElementsByTagName('head')[0];
            const style=document.createElement("link");
            style.href= styles_array[j];
            style.rel='stylesheet';
            style.type='text/css';
            head.appendChild(style);
        }

        for(var i=0; i< scripts_array.length ;i++) {
            const script = document.createElement("script");
            script.src = scripts_array[i];
            script.async = true;
            document.body.appendChild(script);
        }
        const script_body= document.createElement("script");

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
