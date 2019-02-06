import {Component} from "react";
import React from "react";
import Footer from "../../layouts/footer"
import Breadcrumbs from "../../layouts/breadcrumbs_2l";
import axios from "axios";

export default class Invoice_detail extends Component {
    constructor(props){
        super(props);
        this.state ={
            invoices:[],
            invoice_id:[],
            invoice_details:[]
        }
    }


    componentDidMount() {


        const newInvState = Object.assign({}, this.state, {
            invoice_id: this.props.match.params.invoice_id
        });

        console.log("params " + newInvState)

        this.setState(newInvState);
        var sth = this.state.invoice_id;
        console.log("sht"+ sth)

        axios
            .get("http://127.0.0.1:8000/api/v1/invoices/"+this.props.match.params.invoice_id)
            .then(response => {

                // create an array of projects only with relevant data
                const newInvoices = response.data.data;
                console.log("all invoice details "+ newInvoices)

                // create a new "State" object without mutating
                // the original State object.

                // store the new state object in the component's state



                const newState = Object.assign({}, this.state, {
                    invoices: newInvoices
                });
                this.setState(newState);
                console.log("inv details" + newState)
            })
            .catch(error => console.log(error));
    };



    render() {
        var product_cost=0;
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
                                    {
                                        this.state.invoices.map(inv=>{
                                            return(
                                                <div className="panel-body">
                                                    <div className="clearfix">
                                                        <div className="pull-left">
                                                            <h4 className="text-right">
                                                                <img src="/skality_logo.png" height={"55"+ "px"}
                                                                                            alt="Skality"/></h4>
                                                        </div>
                                                        <div className="pull-right">
                                                            <h4 className="font-16">Invoice #<strong>{inv.id}</strong> <br/>
                                                            </h4>
                                                        </div>
                                                    </div>
                                                    <hr/>
                                                    <span>
                                                    <div className="row">
                                                        <div className="col-md-12">

                                                            <div className="pull-left m-t-30">
                                                                <h5 className="header-title m-t-0">Billed to: </h5>


                                                                <address>
                                                                    <strong>{inv.customer.name}</strong><br/>

                                                                    795 Folsom Ave, Suite 600<br/>
                                                                    San Francisco, CA 94107<br/>
                                                                    <abbr title="Email">E:</abbr> {inv.customer.email}
                                                                </address>
                                                                <p><strong>Order Date: </strong> {inv.created_at}</p>

                                                            </div>
                                                            <div className="pull-right m-t-30">
                                                                <address>
                                                                    <strong>Skality Enteprises.</strong><br/>
                                                                    KMA Centre Mara Road 2 nd floor office 212<br/>
                                                                    Nairobi Kenya<br/>
                                                                    <abbr title="Phone">P:</abbr> (+254) 716 651687 / (+254) +254 716 058638
                                                                </address>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="m-h-50"></div>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="table-responsive">
                                                                <table className="table m-t-30">
                                                                    <thead>
                                                                    <tr>
                                                                        <td>#</td>
                                                                        <th>Product ID</th>
                                                                        <th>Item</th>
                                                                        <th>Price</th>
                                                                    </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    {

                                                                        inv.products.map(function(product, count){
                                                                            var price = product.price;
                                                                            product_cost+=product.price;
                                                                            return(
                                                                                <tr>
                                                                                <td>{count+1}</td>
                                                                                <td>{product.id}</td>
                                                                                <td>{product.name}</td>
                                                                                <td>{price.toLocaleString()}</td>

                                                                                </tr>

                                                                            )
                                                                        })
                                                                    }


                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row justify-content-end">
                                                        <div className="col-md-3">
                                                            <p className="text-right"><b>Sub-total:</b> {product_cost.toLocaleString()}</p>
                                                            {/*<p className="text-right">Discout: 12.9%</p>*/}
                                                            <p className="text-right">VAT: 16%</p>
                                                            <hr/>
                                                            <h3 className="text-right">Total : KSH {(product_cost*1.16).toLocaleString()}</h3>
                                                            <h3 className="text-right">Paid : KSH {product_cost.toLocaleString()}</h3>

                                                        </div>
                                                    </div>
                                                    <hr/>
                                                    <div className="d-print-none">
                                                        <div className="text-right">
                                                            <a href="javascript:window.print()"
                                                               className="btn btn-inverse waves-effect waves-light"><i
                                                                className="fa fa-print"></i></a>
                                                            <a href="#"
                                                               className="btn btn-primary waves-effect waves-light">Submit</a>
                                                        </div>
                                                    </div>
                                                    </span>


                                                </div>
                                            );
                                        })
                                    }
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