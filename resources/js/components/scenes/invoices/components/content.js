import {Component} from "react";
import React from "react";
import Footer from "../../layouts/footer"
import Breadcrumbs from "../../layouts/breadcrumbs_2l";
import {Link} from 'react-router-dom'
import axios from "axios";

export default class Content extends Component {
    constructor(props){
        super(props);
        this.state ={
            invoices:[],
            isLoading:true
        }
    }

    componentDidMount() {

        console.log(this.invoice_id)
        axios
            .get("http://127.0.0.1:8000/api/v1/invoices")
            .then(response => {

                // create an array of projects only with relevant data
                const newInvoices = response.data.data;
                console.log("all invoices"+ newInvoices)

                // create a new "State" object without mutating
                // the original State object.
                const newState = Object.assign({}, this.state, {
                    invoices: newInvoices,
                    isLoading: false
                });
                // console.log(newInvoices)


                // store the new state object in the component's state
                this.setState(newState);
            })
            .catch(error => console.log(error));
    };

    create_table()
    {
        var values = this.state.invoices.map(c=>{
        var customer_name ="";
        var avatar="";
        var customer_email="";
        var created_at="";
            if((c.customer !== null) ){
                customer_name = c.customer.name;
                avatar=c.customer.user_avatar;
                customer_email=c.customer.email;
                created_at=c.created_at;
            }else{
                customer_name="";
                avatar="http://www.sbcs.edu.tt/wp-content/uploads/2016/04/profile-default.png";

            }
            console.log("sdffsfdf" + customer_name)

            return([
                <tr>
                    <td>
                        <div className="checkbox checkbox-primary m-r-15">
                            <input id="checkbox2" type="checkbox" />
                            <label htmlFor="checkbox2"></label>
                        </div>

                        <img src={avatar} alt="contact-img"
                             title="contact-img" className="rounded-circle thumb-sm"/>
                    </td>
                    <td><Link className="btn btn-primary waves-effect" to={"invoices/"+c.id }>INV#{c.id}</Link></td>
                    <td>
                        {customer_name}
                    </td>

                    <td>
                        {customer_email}
                    </td>
                    <td>
                        <span className="label label-success">Accepted</span>
                    </td>
                    <td>
                        {created_at}
                    </td>
                    <td>
                        <a href="#" className="table-action-btn"><i
                            className="md md-edit"/></a>
                        <a href="#" className="table-action-btn"><i
                            className="md md-file-download"/></a>
                    </td>
                </tr>


            ]);
        });

        return values;

    }



    render() {

        var isLoading = this.state.isLoading;
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
                                        <table className="table table-hover mails m-0 table table-actions-bar">
                                            <thead>
                                            <tr>
                                                <th style={{width: '120'+"px"}}>
                                                    <div className="checkbox checkbox-primary checkbox-single m-r-15">
                                                        <input id="action-checkbox" type="checkbox"/>
                                                        <label htmlFor="action-checkbox"></label>
                                                    </div>

                                                </th>
                                                <th>Invoice ID</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Acceptance Status</th>
                                                <th>Start Date</th>
                                                <th>Action</th>
                                            </tr>
                                            </thead>

                                            <tbody>

                                            {
                                                !isLoading ? this.create_table() :
                                                    <tr>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <div className="text-center offset-md-5">
                                                            <div className="spinner-border" role="status">
                                                                <span className="sr-only">Loading...</span>
                                                            </div>
                                                        </div>
                                                    </tr>
                                            }

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