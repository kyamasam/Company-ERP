import {Component} from "react";
import React from "react";
import Footer from "../../layouts/footer"

export default class Content extends Component {
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

                                <h4 className="page-title">Dashboard 3</h4>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="#">Ubold</a></li>
                                    <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
                                    <li className="breadcrumb-item active">Dashboard 3</li>
                                </ol>

                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}