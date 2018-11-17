import React, { Component } from 'react';
import {Link} from "react-router-dom";

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
                <div className="account-pages"/>
                <div className="clearfix"/>

                <div className="wrapper-page">
                    <div className="ex-page-content text-center">
                        <div className="text-error">
                            <span className="text-primary">4</span>
                            <i className="ti-face-sad text-pink"/>
                            <span className="text-info">4</span>
                        </div>
                        <h2>Who0ps! Page not found</h2>
                        <br/>
                        <p className="text-muted">This page cannot found or is missing.</p>
                        <p className="text-muted">Use the navigation above or the button below to get back and track.</p>
                        <br/>
                        <Link className='btn btn-default waves-effect waves-light' to='/'>Return Home</Link>
                    </div>
                </div>
            </div>
        );
    }
}