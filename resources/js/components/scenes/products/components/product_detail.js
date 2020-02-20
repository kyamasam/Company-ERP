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
            products:[],
            isLoading:true,
            payments:[],
            payment_id:0,
            product_id:0,
            user_id:0

        }
    }
    onSubmit(e){
        e.preventDefault();
        const {payment_id, product_id, user_id} = this.state ;
        console.log("data to post");
        console.log(
            payment_id,
            product_id,
            user_id,);

        axios.post('/api/v1/subscriptions', {
            payment_id,
            product_id,
            user_id,
        })

            .then(response=> {
                console.log(response)
                if(response.data === "successful") {
                    this.setState({
                        success_validation_message: 'Successfully Subscribed to ',
                        show_err: true
                    });
                    this.props.history.push('/products');
                }
                else {
                    this.setState({err_validation_message: response.data,})
                }

            })
            .catch(error=> {
                console.log("we have an error");
                console.log(error);
                this.setState({err: true});
            });
    }

    normalChange(e){
        const {name, value} = e.target;
        this.setState({[name]: value},
            function () {
                this.checkState();
        });
    }
    checkState(){
        console.log("new state");
        console.log("new payments");
        console.log(this.state.payment_id)
        console.log("new product_id");
        console.log(this.state.product_id)
        console.log("new user_id");
        console.log(this.state.user_id)
    }

    componentDidMount() {

        console.log(this.invoice_id)
        axios.all([
            axios.get("/api/v1/products/"+this.props.match.params.product_id),
            axios.get("/api/v1/payments/user/1")
        ])
            .then(axios.spread((ProductsRes, PaymentsRes) => {

                // create an array of projects only with relevant data
                const newProducts = ProductsRes.data.data;
                const paymentResults=PaymentsRes.data.data;

                paymentResults.map(project=>(
                    project.payments.map(payment=>(
                        console.log({value: payment.id ,label: payment.currency +' ' + payment.amount })
                    ))
                ));
                console.log("all invoices"+ newProducts)

                // create a new "State" object without mutating
                // the original State object.
                const newState = Object.assign({}, this.state, {
                    products: newProducts,
                    isLoading: false,
                    payments:paymentResults,
                    product_id:this.props.match.params.product_id,
                    user_id:localStorage.getItem('user_id')
                });
                // console.log(newProducts)
                console.log(paymentResults);



                // store the new state object in the component's state
                this.setState(newState);
        }))
            .catch(error => {console.log(error)});
    };

    create_table()
    {
        var values = this.state.products;
        var product_name ="";
        var price="";
        var associations="";
        var subscription_duration="";
        var category="";
        if((values !== null) ){
            product_name = values.name;
            price= values.price;
            subscription_duration = values.subscription_duration
            associations= values.association;
            category= values.category;
        }else{
            product_name = '';
            price= '';
            associations='';
            subscription_duration=''
            category= '';
        }
        console.log("sdffsfdf" + product_name)



            return([



                <div className="col-12">

                    <div className="card-box product-detail-box">
                        <div className="row">

                            <div className="col-sm-12">
                                <div className="text-center">
                                    <h4><b>Product Name: {product_name}</b>
                                        {/*<Link className="btn btn-default btn-md waves-effect waves-light m-b-30 pull-right" to={'/products/edit/'+this.props.match.params.product_id}>*/}
                                            {/*Edit Product <i className="md md-mode-edit ml-1"/>*/}
                                        {/*</Link>*/}
                                        {/*<input type="button" className="btn btn-default btn-md waves-effect waves-light m-b-30 pull-right" >*/}
                                            {/*Subscribe <i className="md md-mode-edit ml-1"/>*/}
                                        {/*</input>*/}

                                    </h4>


                                    <h5 className="m-t-20">

                                    </h5>




                                    <hr className="col-md-6" />

                                    <h5 className="font-600">Product price: {price}</h5>
                                    <h5 className="font-600">Subscription Duration: {subscription_duration} Days</h5>


                                    <div className="row m-t-30">
                                        <div className="col-12 col-md-12 text-center">
                                            <h4 className="font-18"><b>Category:</b></h4>
                                            <div className="table-responsive m-t-20">
                                                <table className="table">
                                                    <tbody>
                                                    {
                                                        category.map((cat,index)=>{
                                                            return([
                                                                <span key={index} className="label label-info mr-4">{cat.category_name} </span>
                                                            ])
                                                        })
                                                    }

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                    </div>
                                    <button type="button" className="btn btn-default btn-md waves-effect waves-light m-b-30 "
                                            data-toggle="modal" data-target="#CenterModal">Subscribe
                                    </button>


                                    <div id="CenterModal" className="modal fade" tabIndex="-1" role="dialog"
                                         aria-labelledby="CenterModalLabel" aria-hidden="true" style={{display: 'none'}}>
                                        <div className="modal-dialog modal-dialog-centered">
                                            <div className="modal-content">
                                                <div className="modal-header">

                                                    <h4 className="modal-title" id="CenterModalLabel">Subscribe to {product_name}</h4>
                                                    <button type="button" className="close" data-dismiss="modal"
                                                            aria-hidden="true">×
                                                    </button>
                                                </div>
                                                <div className="p-20">
                                                    <form className="form-horizontal" role="form" method="POST" onSubmit= {this.onSubmit.bind(this)} >

                                                        <div className="form-group row">
                                                            <label className="col-2 col-form-label">Select Payment</label>
                                                            <div className="col-10">
                                                                <select className="custom-select mt-3" name="payment_id" ref="payment_id" onChange={this.normalChange.bind(this)}>
                                                                    <option selected="">Open this select menu</option>
                                                                    {
                                                                        this.state.payments.map(project=>(
                                                                            project.payments.map(payment=>(
                                                                                <option value={payment.id}>{payment.currency +' '+ payment.amount }</option>
                                                                            ))
                                                                        ))
                                                                    }
                                                                </select>
                                                            </div>


                                                        </div>



                                                        <div className="form-group row">
                                                            <div className="col-md-4 offset-4" >
                                                                <button className="btn btn-primary waves-effect waves-light"
                                                                        type="submit">
                                                                    Submit
                                                                </button>
                                                            </div>
                                                        </div>


                                                    </form>
                                                </div>
                                            </div>
                                            {/*/.modal-content*/}
                                        </div>
                                        {/*/.modal-dialog */}
                                    </div>

                                </div>
                            </div>


                        </div>
                        {/*end row*/}




                    </div>

                </div>

            ]);


    }



    render() {

        let error = this.state.err ;

        let msg = (!error) ? 'Record created Successfully' : 'Oops! , Something went wrong. Try again' ;
        let name = (!error) ? 'alert alert-success' : 'alert alert-danger' ;
        let save_error= this.state.err_validation_message;
        let save_success =this.state.success_validation_message;
        let show_err = this.state.show_err;
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

                                <Breadcrumbs {...this.props}/>

                                {error != undefined && <div className={name} role="alert">{msg}</div>}

                                {
                                    show_err !=undefined ?<span></span> :
                                        save_error !=undefined && <div className="alert alert-danger">{save_error}</div>
                                }
                                {save_success !=undefined && <div className="alert alert-success">{save_success}</div> }

                                        {
                                            !isLoading ? this.create_table() :
                                                <div className="offset-md-1">
                                                    <div className="text-center offset-md-5">
                                                        <div className="spinner-border" role="status">
                                                            <span className="sr-only">Loading...</span>
                                                        </div>
                                                    </div>
                                                </div>
                                        }
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}