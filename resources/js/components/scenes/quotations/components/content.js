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
                                <div className="card-box">
                                    <div className="row m-t-10 m-b-10">
                                        <div className="col-sm-6 col-lg-8">
                                            {/*<form role="form">*/}
                                                <div className="form-group contact-search m-b-30">
                                                    <input type="text" id="search" className="form-control"
                                                           placeholder="Search..."/>
                                                        <button type="submit" className="btn btn-white">
                                                            <i className="fa fa-search"/>
                                                        </button>


                                                </div>
                                            {/*</form>*/}
                                        </div>

                                        <div className="col-sm-6 col-lg-4">
                                            <div className="h5 m-0">
                                                <span className="font-16">Sort By:</span>
                                                <div className="btn-group vertical-middle" data-toggle="buttons">
                                                    <label className="btn btn-white btn-md waves-effect active mb-0">
                                                        Status
                                                    </label>
                                                    <label className="btn btn-white btn-md waves-effect mb-0">
                                                         Type
                                                    </label>
                                                    <label className="btn btn-white btn-md waves-effect mb-0">
                                                        Name
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="table-responsive">
                                        <table className="table table-actions-bar">
                                            <thead>
                                            <tr>
                                                <th>Product</th>
                                                <th>Order Date</th>
                                                <th>Order Number</th>
                                                <th>Seller</th>
                                                <th>Status</th>
                                                <th>Amount</th>
                                                <th style={{minWidth: 80}}>Action</th>
                                            </tr>
                                            </thead>

                                            <tbody>
                                            <tr>
                                                <td><img src="assets/images/products/iphone.jpg" className="thumb-sm"
                                                         alt=""/></td>
                                                <td>08/10/2015</td>
                                                <td><a href="#">UB#160924</a></td>
                                                <td>
                                                    <a href="#" className="text-dark"><b>Apple Inc.</b></a>
                                                </td>
                                                <td>
                                                    <span className="label label-success">Deliverd</span>
                                                </td>
                                                <td>$1,256</td>
                                                <td>
                                                    <a href="#" className="table-action-btn"><i
                                                        className="md md-edit"/></a>
                                                    <a href="#" className="table-action-btn"><i
                                                        className="md md-close"/></a>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td><img src="assets/images/products/samsung.jpg" className="thumb-sm"
                                                         alt=""/></td>
                                                <td>08/10/2015</td>
                                                <td><a href="#">UB#160923</a></td>
                                                <td>
                                                    <a href="#" className="text-dark"><b>Samsung Company</b></a>
                                                </td>
                                                <td>
                                                    <span className="label label-warning">Shipped</span>
                                                </td>
                                                <td>$2,562</td>
                                                <td>
                                                    <a href="#" className="table-action-btn"><i
                                                        className="md md-edit"/></a>
                                                    <a href="#" className="table-action-btn"><i
                                                        className="md md-close"/></a>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td><img src="assets/images/products/lumia.jpg" className="thumb-sm"
                                                         alt=""/></td>
                                                <td>08/10/2015</td>
                                                <td><a href="#">UB#160922</a></td>
                                                <td>
                                                    <a href="#" className="text-dark"><b>Sony Company</b></a>
                                                </td>
                                                <td>
                                                    <span className="label label-primary">Proceed</span>
                                                </td>
                                                <td>$6,458</td>
                                                <td>
                                                    <a href="#" className="table-action-btn"><i
                                                        className="md md-edit"/></a>
                                                    <a href="#" className="table-action-btn"><i
                                                        className="md md-close"/></a>
                                                </td>
                                            </tr>



                                            </tbody>
                                        </table>
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