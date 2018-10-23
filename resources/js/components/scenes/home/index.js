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


                        <div className="row">
                            <div className="col-lg-12 col-xl-4">
                                <div className="card-box">
                                    <div className="bar-widget">
                                        <div className="table-box">
                                            <div className="table-detail">
                                                <div className="iconbox bg-info">
                                                    <i className="icon-layers"/>
                                                </div>
                                            </div>

                                            <div className="table-detail">
                                                <h4 className="m-t-0 m-b-5"><b>12560</b></h4>
                                                <p className="text-muted m-b-0 m-t-0">Total Revenue</p>
                                            </div>
                                            <div className="table-detail text-right">
                                                <span data-plugin="peity-bar" data-colors="#34d3eb,#ebeff2"
                                                      data-width="120"
                                                      data-height="45">5,3,9,6,5,9,7,3,5,2,9,7,2,1</span>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-12 col-xl-4">
                                <div className="card-box">
                                    <div className="bar-widget">
                                        <div className="table-box">
                                            <div className="table-detail">
                                                <div className="iconbox bg-custom">
                                                    <i className="icon-layers"/>
                                                </div>
                                            </div>

                                            <div className="table-detail">
                                                <h4 className="m-t-0 m-b-5"><b>356</b></h4>
                                                <p className="text-muted m-b-0 m-t-0">Ave. weekly Sales</p>
                                            </div>
                                            <div className="table-detail text-right">
                                                <span data-plugin="peity-pie" data-colors="#5fbeaa,#ebeff2"
                                                      data-width="50" data-height="45">1/5</span>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-12 col-xl-4">
                                <div className="card-box">
                                    <div className="bar-widget">
                                        <div className="table-box">
                                            <div className="table-detail">
                                                <div className="iconbox bg-danger">
                                                    <i className="icon-layers"/>
                                                </div>
                                            </div>

                                            <div className="table-detail">
                                                <h4 className="m-t-0 m-b-5"><b>96562</b></h4>
                                                <p className="text-muted m-b-0 m-t-0">Visiters</p>
                                            </div>
                                            <div className="table-detail text-right">
                                                <span data-plugin="peity-donut" data-colors="#f05050,#ebeff2"
                                                      data-width="50" data-height="45">1/5</span>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="row">

                            <div className="col-lg-12 col-xl-4">
                                <div className="card-box">
                                    <h4 className="text-dark header-title m-t-0 m-b-30">Daily Sales</h4>

                                    <div className="widget-chart text-center">
                                        <div id="sparkline3"/>
                                        <ul className="list-inline m-t-15">
                                            <li>
                                                <h5 className="text-muted m-t-20">Target</h5>
                                                <h4 className="m-b-0">$1000</h4>
                                            </li>
                                            <li>
                                                <h5 className="text-muted m-t-20">Last week</h5>
                                                <h4 className="m-b-0">$523</h4>
                                            </li>
                                            <li>
                                                <h5 className="text-muted m-t-20">Last Month</h5>
                                                <h4 className="m-b-0">$965</h4>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                            </div>

                            <div className="col-lg-12 col-xl-4">
                                <div className="card-box">
                                    <h4 className="text-dark  header-title m-t-0 m-b-30">Weekly Sales</h4>

                                    <div className="widget-chart text-center">
                                        <div id="sparkline2"/>
                                        <ul className="list-inline m-t-15">
                                            <li>
                                                <h5 className="text-muted m-t-20">Target</h5>
                                                <h4 className="m-b-0">$1000</h4>
                                            </li>
                                            <li>
                                                <h5 className="text-muted m-t-20">Last week</h5>
                                                <h4 className="m-b-0">$523</h4>
                                            </li>
                                            <li>
                                                <h5 className="text-muted m-t-20">Last Month</h5>
                                                <h4 className="m-b-0">$965</h4>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                            </div>

                            <div className="col-lg-12 col-xl-4">
                                <div className="card-box">
                                    <h4 className="text-dark  header-title m-t-0 m-b-30">Monthly Sales</h4>

                                    <div className="widget-chart text-center">
                                        <div id="sparkline1"/>
                                        <ul className="list-inline m-t-15">
                                            <li>
                                                <h5 className="text-muted m-t-20">Target</h5>
                                                <h4 className="m-b-0">$1000</h4>
                                            </li>
                                            <li>
                                                <h5 className="text-muted m-t-20">Last week</h5>
                                                <h4 className="m-b-0">$523</h4>
                                            </li>
                                            <li>
                                                <h5 className="text-muted m-t-20">Last Month</h5>
                                                <h4 className="m-b-0">$965</h4>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                            </div>


                        </div>


                        <div className="row">

                            <div className="col-12">

                                <div className="portlet">
                                    <div className="portlet-heading">
                                        <h3 className="portlet-title text-dark text-uppercase">
                                            Projects
                                        </h3>
                                        <div className="portlet-widgets">
                                            <a href="javascript:;" data-toggle="reload"><i className="ion-refresh"/></a>
                                            <span className="divider"/>
                                            <a data-toggle="collapse" data-parent="#accordion1" href="#portlet2"><i
                                                className="ion-minus-round"/></a>
                                            <span className="divider"/>
                                            <a href="#" data-toggle="remove"><i className="ion-close-round"/></a>
                                        </div>
                                        <div className="clearfix"/>
                                    </div>
                                    <div id="portlet2" className="panel-collapse collapse show">
                                        <div className="portlet-body">
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Project Name</th>
                                                        <th>Start Date</th>
                                                        <th>Due Date</th>
                                                        <th>Status</th>
                                                        <th>Assign</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>Ubold Admin v1</td>
                                                        <td>01/01/2015</td>
                                                        <td>26/04/2015</td>
                                                        <td><span className="label label-info">Released</span></td>
                                                        <td>Coderthemes</td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>Ubold Frontend v1</td>
                                                        <td>01/01/2015</td>
                                                        <td>26/04/2015</td>
                                                        <td><span className="label label-success">Released</span></td>
                                                        <td>Coderthemes</td>
                                                    </tr>
                                                    <tr>
                                                        <td>3</td>
                                                        <td>Ubold Admin v1.1</td>
                                                        <td>01/05/2015</td>
                                                        <td>10/05/2015</td>
                                                        <td><span className="label label-pink">Pending</span></td>
                                                        <td>Coderthemes</td>
                                                    </tr>
                                                    <tr>
                                                        <td>4</td>
                                                        <td>Ubold Frontend v1.1</td>
                                                        <td>01/01/2015</td>
                                                        <td>31/05/2015</td>
                                                        <td><span className="label label-purple">Work in Progress</span>
                                                        </td>
                                                        <td>Coderthemes</td>
                                                    </tr>
                                                    <tr>
                                                        <td>5</td>
                                                        <td>Ubold Admin v1.3</td>
                                                        <td>01/01/2015</td>
                                                        <td>31/05/2015</td>
                                                        <td><span className="label label-warning">Coming soon</span>
                                                        </td>
                                                        <td>Coderthemes</td>
                                                    </tr>

                                                    <tr>
                                                        <td>6</td>
                                                        <td>Ubold Admin v1.3</td>
                                                        <td>01/01/2015</td>
                                                        <td>31/05/2015</td>
                                                        <td><span className="label label-primary">Coming soon</span>
                                                        </td>
                                                        <td>Coderthemes</td>
                                                    </tr>

                                                    <tr>
                                                        <td>7</td>
                                                        <td>Ubold Admin v1.3</td>
                                                        <td>01/01/2015</td>
                                                        <td>31/05/2015</td>
                                                        <td><span className="label label-info">Cool</span></td>
                                                        <td>Coderthemes</td>
                                                    </tr>

                                                    <tr>
                                                        <td>8</td>
                                                        <td>Ubold Admin v1.3</td>
                                                        <td>01/01/2015</td>
                                                        <td>31/05/2015</td>
                                                        <td><span className="label label-warning">Coming soon</span>
                                                        </td>
                                                        <td>Coderthemes</td>
                                                    </tr>

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="footer text-right">
                    &copy; 2016 - 2018. All rights reserved.
                </footer>
            </div>
        );
    }
}