import {Component} from "react";
import React from "react";
import Footer from "../../layouts/footer"
import Breadcrumbs from "../../layouts/breadcrumbs_2l";

export default class Content extends Component {
    constructor(props){
        super(props);
    }
    componentWillMount(){
    }
    componentDidMount(){
        $('[data-toggle="table"]').show();
    }
    render() {
        return (
            <div className="content-page">
                <div className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="btn-group pull-right m-t-15">
                                    <button type="button"
                                            className="btn btn-default dropdown-toggle waves-effect waves-light"
                                            data-toggle="dropdown" aria-expanded="false">Settings
                                    </button>
                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="btnGroupDrop1">
                                        <a className="dropdown-item" href="#">Dropdown One</a>
                                        <a className="dropdown-item" href="#">Dropdown Two</a>
                                        <a className="dropdown-item" href="#">Dropdown Three</a>
                                        <a className="dropdown-item" href="#">Dropdown Four</a>
                                    </div>
                                </div>
                                <Breadcrumbs{...this.props}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="card-box">
                                    <h4 className="m-t-0 header-title"><b>Custom Toolbar</b></h4>
                                    <p className="text-muted font-13">
                                        Example of Custom Toolbar (Your text goes here).
                                    </p>
                                    <button id="demo-delete-row" className="btn btn-danger" disabled>
                                        <i className="fa fa-times m-r-5"/>Delete
                                    </button>
                                    <table id="table"
                                           data-toggle="table"
                                           data-toolbar="#toolbar"
                                           data-height="428"
                                           data-url="/json/data.json">
                                        <thead>
                                        <tr>
                                            <th data-field="id">ID</th>
                                            <th data-field="name">Item Name</th>
                                            <th data-field="price">Item Price</th>
                                        </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}