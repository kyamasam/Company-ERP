import React, { Component } from 'react';
import TopNav from "../layouts/topNav";
import SideNav from "../layouts/sideNav";
import RightNav from "../layouts/rightNav";
import Content from "./components/ticket_detail";

export default class TicketsDetail extends Component {
    constructor(props){
        super(props);

    }

    componentDidMount(){
        var scripts_array=[
            '/js/jquery.core.js',
            '/assets/js/jquery.app.js'
        ];

        for(var i=0; i< scripts_array.length ;i++) {
            const script = document.createElement("script");
            script.src = scripts_array[i];
            script.async = true;
            document.body.appendChild(script);
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
