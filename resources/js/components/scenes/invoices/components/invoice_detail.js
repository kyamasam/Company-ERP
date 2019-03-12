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
            invoice_details:[],
            payments:[]
        }
    }


    componentDidMount() {


        const newInvState = Object.assign({}, this.state, {
            invoice_id: this.props.match.params.invoice_id
        });

        console.log("params " + newInvState)

        this.setState(newInvState);
        var sth = this.state.invoice_id;
        console.log("sht"+ sth);

        axios
            .get("/api/v1/invoices/"+this.props.match.params.invoice_id)
            .then(response => {

                // create an array of projects only with relevant data
                const newInvoices = response.data.data;
                console.log("detailts");
                console.log(newInvoices)

                // create a new "State" object without mutating
                // the original State object.

                // store the new state object in the component's state



                const newState = Object.assign({}, this.state, {
                    invoices: newInvoices
                });
                this.setState(newState);
                console.log(newState)
            }).catch(error =>{
                if (error.response.status === 401){
                    window.location.replace("/login");
                }
                else{
                    console.log(error.response);
                }
            }

        );
        this.getPayments()
    };

    getPayments(){
        axios.get('/api/v1/payments/invoice/9').then(response=>{
            const Payments=response.data.data;

            const newPaymentState= Object.assign({},this.state,{
                payments:Payments
            });

            this.setState(newPaymentState);

        }).catch(error=>{
            console.log(error)
        })
        ;
    }

    paymentLength(){
        var i;

        var counter_result=0;
        //get the length of object
        const payments_obj=this.state.payments;
        var count=0;
        for (i in payments_obj){
            if(payments_obj.hasOwnProperty(i)){
                counter_result++;
            }
            else {

            }
        }
        return counter_result;
    }


    render() {
        var product_cost=0;var total_paid=0;

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
                                                                    {/*<strong>{inv.customer.name}</strong><br/>*/}

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

                                                    <h4 className="m-t-0 header-title">Products</h4>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="table-responsive">
                                                                <table className="table table-bordered m-t-30">
                                                                    <thead>
                                                                    <tr className="thead-dark">
                                                                        <th>No.</th>
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
                                                                                <td>{count+1}.</td>
                                                                                <td>{product.name}</td>
                                                                                <td>{price.toLocaleString()}</td>

                                                                                </tr>

                                                                            )
                                                                        })

                                                                    }
                                                                    <tr>
                                                                        <td colSpan="4">
                                                                            <div className="row justify-content-end">
                                                                                <div className="col-md-3">
                                                                                    <p className="text-right"><b>Sub-total:</b> {product_cost.toLocaleString()}</p>
                                                                                    {/*<p className="text-right">Discout: 12.9%</p>*/}
                                                                                    <p className="text-right">VAT: 16%</p>
                                                                                    <hr/>
                                                                                    <h3 className="text-right">Total : KSH {(product_cost*1.16).toLocaleString()}</h3>
                                                                                    {


                                                                                        this.state.payments.map((pay,count)=>{

                                                                                           console.log("counting");
                                                                                           console.log(count);
                                                                                           console.log("len?");
                                                                                            console.log(this.paymentLength());
                                                                                            total_paid = total_paid+ pay.amount;
                                                                                               if(this.paymentLength() === count+1) {

                                                                                                   return (
                                                                                                       <div>
                                                                                                           <h3 className="text-right">
                                                                                                               Paid : KSH {(total_paid).toLocaleString()}
                                                                                                           </h3>
                                                                                                           <h3 className="text-right text-danger">
                                                                                                               Due : KSH {((product_cost*1.16)-(total_paid)).toLocaleString()}
                                                                                                           </h3>
                                                                                                       </div>
                                                                                                   )
                                                                                               }
                                                                                        })
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>


                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <hr/>
                                                    <h4 className="m-t-0 header-title">Transactions</h4>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="table-responsive">
                                                                <table className="table table-bordered m-t-30">
                                                                    <thead>
                                                                    <tr className="thead-dark">
                                                                        <th>No.</th>
                                                                        <th>Payment ID</th>
                                                                        <th>Amount</th>
                                                                        <th>Payment Method</th>
                                                                        <th>Date Paid</th>
                                                                    </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {
                                                                            this.state.payments.map((payment,counter)=>{
                                                                                var myDate=payment.created_at;
                                                                                return(
                                                                                    <tr>
                                                                                        <td>{counter+=1}</td>
                                                                                        <td> {payment.id}</td>
                                                                                        <td> {(payment.amount).toLocaleString()}</td>
                                                                                        <td> {payment.payment_method}</td>
                                                                                        <td> {myDate}</td>
                                                                                    </tr>

                                                                                );
                                                                            })
                                                                        }
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
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