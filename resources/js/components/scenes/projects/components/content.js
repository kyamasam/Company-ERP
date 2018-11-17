import {Component} from "react";
import React from "react";
import Footer from "../../layouts/footer"
import Breadcrumbs from "../../layouts/breadcrumbs_2l";
import {Link} from "react-router-dom";

export default class Content extends Component {
    constructor(props){
        super(props);
    }
    componentWillMount(){
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
                            <div className="col-md-10">
                                <form role="form">
                                    <div className="form-group contact-search m-b-30">
                                        <input type="text" id="search" className="form-control" placeholder="Search..."/>
                                        <button type="submit" className="btn btn-white">
                                            <i className="fa fa-search"/>
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="col-md-2">
                                <Link className="btn btn-default btn-md waves-effect waves-light m-b-30 pull-right" to='/quotations'>
                                    <i className="md md-add"/> New Project
                                </Link>

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card-box m-b-12">
                                    <div className="table-box opport-box">
                                        <div className="table-detail checkbx-detail">
                                            <div className="checkbox checkbox-primary checkbox-single m-r-15">
                                                <input id="checkbox1" type="checkbox"/>
                                                <label htmlFor="checkbox1"/>
                                            </div>
                                        </div>
                                        <div className="table-detail">
                                            <div className="member-info">
                                                <h4 className="m-t-0">
                                                    <b>Kejamove Payment Platform. </b>
                                                </h4>
                                                <p className="text-dark m-b-0">
                                                    <b>Internal Code Name: </b>
                                                    <span className="text-muted">Project Scorpio</span>
                                                </p>
                                                <p className="text-dark m-b-0">
                                                    <b>Lead Programmer: </b>
                                                    <span className="text-muted">Samuel Kyama</span>
                                                </p>
                                                <p className="text-dark m-b-0">
                                                    <b>Programming Team: </b>
                                                    <span className="text-muted">Solo</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="table-detail">
                                            <p className="text-dark m-b-0">
                                                <b>Email:</b>
                                                <span className="text-muted">samuelkyama102@gmail.com</span>
                                            </p>
                                            <p className="text-dark m-b-0">
                                                <b>Contact:</b>
                                                <span className="text-muted">0716234567</span>
                                            </p>
                                            <p className="text-dark m-b-5">
                                                <b>Category: </b>
                                                <span className="text-muted">Payments, Mpesa, C2B, B2C</span>
                                            </p>
                                        </div>
                                        <div className="table-detail lable-detail">
                                            <span className="label label-info">In Development</span>
                                        </div>
                                        <div className="table-detail table-actions-bar">
                                            <a href="#" className="table-action-btn">
                                                <i className="md  md-remove-red-eye"/>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="card-box m-b-12">
                                    <div className="table-box opport-box">
                                        <div className="table-detail checkbx-detail">
                                            <div className="checkbox checkbox-primary checkbox-single m-r-15">
                                                <input id="checkbox1" type="checkbox"/>
                                                <label htmlFor="checkbox1"/>
                                            </div>
                                        </div>
                                        <div className="table-detail">
                                            <div className="member-info">
                                                <h4 className="m-t-0">
                                                    <b>Delta Centre Charity Centre. </b>
                                                </h4>
                                                <p className="text-dark m-b-0">
                                                    <b>Internal Code Name: </b>
                                                    <span className="text-muted">Project Nexus</span>
                                                </p>
                                                <p className="text-dark m-b-0">
                                                    <b>Lead Programmer: </b>
                                                    <span className="text-muted">Samuel Kyama</span>
                                                </p>
                                                <p className="text-dark m-b-0">
                                                    <b>Programming Team: </b>
                                                    <span className="text-muted">Alpha Team</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="table-detail">
                                            <p className="text-dark m-b-0">
                                                <b>Email:</b>
                                                <span className="text-muted">samuelkyama102@gmail.com</span>
                                            </p>
                                            <p className="text-dark m-b-0">
                                                <b>Contact:</b>
                                                <span className="text-muted">0716234567</span>
                                            </p>
                                            <p className="text-dark m-b-5">
                                                <b>Category: </b>
                                                <span className="text-muted">Charity, Wordpress</span>
                                            </p>
                                        </div>
                                        <div className="table-detail lable-detail">
                                            <span className="label label-success">Completed</span>
                                        </div>
                                        <div className="table-detail table-actions-bar">
                                            <a href="#" className="table-action-btn">
                                                <i className="md  md-remove-red-eye"/>
                                            </a>
                                        </div>
                                    </div>
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