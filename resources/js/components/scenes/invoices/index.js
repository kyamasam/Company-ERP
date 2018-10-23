import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TopNav from "../layouts/topNav";
import SideNav from "../layouts/sideNav";
import RightNav from "../layouts/rightNav";

export default class Home extends Component {
    render() {
        return (
            <div id="wrapper">
                <TopNav/>
                <SideNav/>
                <Content/>
                <RightNav/>
            </div>
        );
    }
}

class Content extends Component{
    render(){
        return(
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Example Component</div>
                            <div className="card-body">
                                I'm an example component!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}