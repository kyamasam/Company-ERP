import {Component} from "react";
import React from "react";
export default class Payment extends Component {
    constructor(props){
        super(props);
        this.state ={
            payments:[],

            isLoading:true,

        }
    }

    componentDidMount() {
        axios
            .get("http://127.0.0.1:8000/api/v1/payments")
            .then(response => {

                // create an array of projects only with relevant data
                const newPayments = response.data.data;
                console.log("all invoices"+ newPayments)

                // create a new "State" object without mutating
                // the original State object.
                const newState = Object.assign({}, this.state, {
                    payments: newPayments,
                    isLoading: false
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

            <div className="row">

                <div className="col-12">

                    <div className="portlet">
                        <div className="portlet-heading">
                            <h3 className="portlet-title text-dark text-uppercase">
                                Payments
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
                                                <th style={{width: '120'+"px"}}>
                                                    <div className="checkbox checkbox-primary checkbox-single m-r-15">
                                                        <input id="action-checkbox" type="checkbox"/>
                                                        <label htmlFor="action-checkbox"></label>
                                                    </div>

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

                                                !this.state.isLoading ? this.create_table() :
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
        )
    }
}