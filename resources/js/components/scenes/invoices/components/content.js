import {Component} from "react";
import React from "react";
import Footer from "../../layouts/footer"
import Breadcrumbs from "../../layouts/breadcrumbs_2l";

export default class Content extends Component {
    constructor(props){
        super(props);
        this.state ={
            invoices:[]
        }
    }

    componentDidMount() {
        axios
            .get("http://127.0.0.1:8000/api/v1/invoices")
            .then(response => {

                // create an array of projects only with relevant data
                const newInvoices = response.data;
                console.log("all invoices"+ newInvoices)

                // create a new "State" object without mutating
                // the original State object.
                const newState = Object.assign({}, this.state, {
                    invoices: newInvoices
                });
                // console.log(newInvoices)


                // store the new state object in the component's state
                this.setState(newState);
            })
            .catch(error => console.log(error));
    };

    create_table()
    {
        var array_of_invoices = [];
        var values = this.state.invoices.map(c=>{
            var myDate = new Date(c.created_at);
            var amount_paid = c.amount

            return([
                <tr>
                <td><a href="#">INV#{c.invoice_id}</a></td>
                <td>{c.currency} {amount_paid.toLocaleString()}</td>
                <td><a href="#">PR#{c.project_id}</a></td>
                <td><a href="#"><span className="label label-success">Deliverd</span></a></td>
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
        // array_of_invoices.push({values})
        // var array_of_invoices = []
        // for (var key in this.state.invoices) {
        //     // skip loop if the property is from prototype
        //     if (!this.state.invoices.hasOwnProperty(key)) continue;
        //
        //     var ivoices_obj = this.state.invoices[key];
        //     // console.log(obj)
        //
        //     var values = ivoices_obj.map((c,index,array) => {
        //
        //             return ([
        //
        //                     <td>{c.invoice_id}</td>,
        //                         <td>{c.amount}</td>,
        //                         <td>{c.project.name}</td>,
        //                         <td>{c.created_at}</td>,
        //                         <td></td>,
        //
        //             ]);
        //
        //         }
        //     );
        //
        //     console.log("this is a test run "+ values)
        //     array_of_invoices.push(<tr>{values}</tr>)
        //     // console.log("expanded values")
        //     // console.log(values)
        // }

        //array inside array


        // console.log("array of invoices")
        // console.log(array_of_invoices)




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
                                                <th>Invoice Id</th>
                                                <th>Amount Paid </th>
                                                <th>Project Name </th>
                                                <th>Status </th>
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
                <Footer/>
            </div>
        )
    }
}