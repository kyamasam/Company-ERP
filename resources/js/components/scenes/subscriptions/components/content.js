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
            subscriptions:[],
            isLoading:true
        }
    }

    componentDidMount() {

        console.log(this.invoice_id)
        axios
            .get("/api/v1/subscriptions")
            .then(response => {

                // create an array of projects only with relevant data
                const newSubscriptions = response.data.data;
                console.log("all invoices");
                console.log(newSubscriptions);

                // create a new "State" object without mutating
                // the original State object.
                const newState = Object.assign({}, this.state, {
                    subscriptions: newSubscriptions,
                    isLoading: false
                });
                // console.log(newProducts)


                // store the new state object in the component's state
                this.setState(newState);
            })
            .catch(error => console.log(error));
    };
    create_table()
    {
        let product_name ="",customer_name ="",customer_id ="",product_id,start_date,expiry_date,expired;
        var full_date=new Date();
        var date_today=full_date.getFullYear()+'-'+(full_date.getMonth()+1)+'-'+full_date.getDate();


       var val= this.state.subscriptions.map((p,index)=>{

            if((p !== null) ){

                if(p.product !== null){
                    product_name =p.product.name;
                }else
                {
                    product_name = '';
                }
                if(p.user !== null){
                    customer_name =p.user.name;
                    customer_id =p.user.id;
                }else
                {
                    customer_name = '';
                    customer_id = '';
                }
                product_id=p.id;
                start_date = p.start_date;
                expiry_date = p.expiry_date;

            }else{

                start_date='';
                expiry_date=''
            }
            console.log("today");
            console.log(date_today);
            console.log('expiry_date');
            console.log(expiry_date)

           if(Date.parse(date_today)>Date.parse(expiry_date)){
               expired = true;
               console.log("setting true")
           }else{
               expired = false;
               console.log("setting false")

           }
            console.log("sdffsfdf" + product_name);

            return([
                <tr key={index}>

                    <td>{p.id}</td>
                    <td><Link className="btn btn-primary waves-effect" to={"/profile/"+customer_id}>{customer_name}</Link></td>

                    <td>{product_name}</td>
                    <td>
                        {start_date}
                    </td>

                    <td>
                        {expiry_date}
                    </td>
                    <td>
                        {expired ?
                            < span className = "label label-danger">Expired</span>
                            :< span className = "label label-success">Active</span>

                        }
                    </td>

                </tr>


            ]);
        });
       return val;


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

                                <Breadcrumbs {...this.props}/>

                                <div className="card-box">
                                    <div className="row m-t-10 m-b-10">
                                        <div className="col-sm-8 col-lg-10">
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

                                        {/*<div className="col-sm-6 col-lg-4">*/}
                                            {/*<div className="h5 m-0">*/}
                                                {/*<Link to="/products/create/"*/}
                                                   {/*className="btn btn-default btn-md waves-effect waves-light m-b-30"><i*/}
                                                    {/*className="md md-add"></i> New Subscription</Link>*/}
                                            {/*</div>*/}
                                        {/*</div>*/}
                                    </div>

                                    <div className="table-responsive">
                                        <table className="table table-hover mails m-0 table table-actions-bar">
                                            <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Customer Name</th>
                                                <th>Product Name</th>
                                                <th>Start Date</th>
                                                <th>Expiry Date </th>
                                                <th>Status</th>

                                            </tr>
                                            </thead>

                                            <tbody>

                                            {
                                                !isLoading ? this.create_table() :
                                                    <tr>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td>
                                                            <div className="text-center offset-md-5">
                                                                <div className="spinner-border" role="status">
                                                                    <span className="sr-only">Loading...</span>
                                                                </div>
                                                            </div>
                                                        </td>
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