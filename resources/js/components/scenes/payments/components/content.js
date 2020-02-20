import {Component} from "react";
import React from "react";
import Footer from "../../layouts/footer"
import Breadcrumbs from "../../layouts/breadcrumbs_2l";

export default class Content extends Component {
    constructor(props){
        super(props);
        this.state ={
            payments:[]

        }
    }

    componentDidMount() {
        axios
            .get("/api/v1/payments")
            .then(response => {

                // create an array of projects only with relevant data
                const newPayments = response.data.data;
                console.log("all invoices"+ newPayments)

                // create a new "State" object without mutating
                // the original State object.
                const newState = Object.assign({}, this.state, {
                    payments: newPayments
                });
                console.log(newPayments)


                // store the new state object in the component's state
                this.setState(newState);
            })
            .catch(error =>{
                    if (error.response.status === 401){
                        window.location.replace("/login");
                    }
                    else{
                        console.log(error.response);
                    }
                }
            );
    };

    create_table()
    {
        var array_of_invoices = [];
        var values = this.state.payments.map(c=>{
            var myDate = new Date(c.created_at);
            var amount_paid = c.amount
            console.log(amount_paid)

            let confirmed_status= "default";
            let confirmed_status_text= "unpaid";

            if(c.confirmed ===0){
                confirmed_status = "danger";
                confirmed_status_text= "Unpaid";

            }
            else{
                confirmed_status = "success";
                confirmed_status_text= "Paid";

            }
            var project_name=""
            if(c.project){
                project_name=c.project.name;
            }
            else{

            }

            return([
                <tr>
                    <td>
                        <div className="checkbox checkbox-primary m-r-15">
                            <input id="checkbox2" type="checkbox" />
                            <label htmlFor="checkbox2"></label>
                        </div>


                    </td>
                    <td><a href="#">INV#{c.invoice_id}</a></td>

                    <td>{c.currency} {amount_paid.toLocaleString()}</td>
                    <td><a href="#">{project_name}</a></td>
                    <td><span className={"label label-"+confirmed_status}>{confirmed_status_text}</span></td>
                    {/*<span className="label label-success">Deliverd</span>*/}
                    <td>{c.payment_method}</td>
                    <td>{myDate.getDate()}/{myDate.getDay()}/{myDate.getFullYear()}</td>
                    <td>
                        <a href="#" className="table-action-btn"><i
                            className="md md-edit"/></a>
                        <a href="#" className="table-action-btn"><i
                            className="md md-file-download"/></a>
                    </td>

                </tr>


            ])
        })

        return values


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



                                <div className="col-lg-12">
                                    <div className="card-box">
                                        <div className="row">
                                            <div className="col-sm-8">
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
                                            <div className="col-sm-4">
                                                <a href="#custom-modal"
                                                   className="btn btn-default btn-md waves-effect waves-light m-b-30"
                                                   data-animation="fadein" data-plugin="custommodal"
                                                   data-overlayspeed="200" data-overlaycolor="#36404a"><i
                                                    className="md md-add"></i> Add Payment</a>
                                            </div>
                                        </div>

                                        <div className="table-responsive">
                                            <table className="table table-hover mails m-0 table table-actions-bar">
                                                <thead>
                                                <tr>
                                                    <th style={{width: '120'+"px"}}>
                                                        <div className="checkbox checkbox-primary checkbox-single m-r-15">
                                                            <input id="action-checkbox" type="checkbox"/>
                                                            <label htmlFor="action-checkbox"></label>
                                                        </div>
                                                        {/*<div className="btn-group dropdown">*/}
                                                        {/*<button type="button"*/}
                                                        {/*className="btn btn-white btn-sm dropdown-toggle waves-effect waves-light"*/}
                                                        {/*data-toggle="dropdown" aria-expanded="false"><i*/}
                                                        {/*className="caret"></i></button>*/}
                                                        {/*<div className="dropdown-menu"*/}
                                                        {/*// aria-labelledby="btnGroupDrop1"*/}
                                                        {/*x-placement="bottom-start"*/}
                                                        {/*style={{position: absolute; transform: translate3d(0px, 31px, 0px); top: 0px; left: 0px; will-change: transform;}}>*/}
                                                        {/*<a className="dropdown-item" href="#">Dropdown One</a>*/}
                                                        {/*<a className="dropdown-item" href="#">Dropdown Two</a>*/}
                                                        {/*<a className="dropdown-item" href="#">Dropdown Three</a>*/}
                                                        {/*<a className="dropdown-item" href="#">Dropdown Four</a>*/}
                                                        {/*</div>*/}
                                                        {/*</div>*/}
                                                    </th>
                                                    <th>Invoice Id</th>
                                                    <th>Amount Paid </th>
                                                    <th>Project Name </th>
                                                    <th>Payment Status </th>
                                                    <th>Payment Method </th>
                                                    <th>Created On </th>

                                                    <th style={{minWidth: 80}}>Action</th>
                                                </tr>
                                                </thead>

                                                <tbody>

                                                {
                                                    this.create_table()
                                                }

                                                </tbody>
                                            </table>
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