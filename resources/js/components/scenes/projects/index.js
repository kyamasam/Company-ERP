import React, { Component } from 'react';
import TopNav from "../layouts/topNav";
import SideNav from "../layouts/sideNav";
import RightNav from "../layouts/rightNav";
import Content from "./components/content";
import EmployeeContent from "./components/employee_project";

export default class Projects extends Component {
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
                {
                    (localStorage.getItem('is_admin') ==='1') ?
                        <Content{...this.props}/>
                        :
                        <EmployeeContent{...this.props}/>

                }

                <RightNav/>
            </div>
        );
    }
}