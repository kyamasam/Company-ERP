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
            isLoading:true
        }
    }

    componentDidMount() {

        console.log(this.invoice_id)
        axios
            .get("/api/v1/products")
            .then(response => {

                // create an array of projects only with relevant data
                const newProducts = response.data.data;
                console.log("all invoices"+ newProducts)

                // create a new "State" object without mutating
                // the original State object.
                const newState = Object.assign({}, this.state, {
                    products: newProducts,
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
        var values = this.state.products.map((p,index)=>{
        var product_name ="";
        var price="";
        var associations="";
        var category="";
            if((p !== null) ){
                product_name = p.name;
                price= p.price;
                associations= p.association;
                category= p.category;
            }else{
                product_name = '';
                price= '';
                associations='';
                category= '';
            }
            console.log("sdffsfdf" + product_name)

            return([
                <tr key={index}>

                    <td>
                        <Link className="btn btn-default btn-md waves-effect waves-light pull-right"
                              to={'/products/'+p.id}>#{p.id}</Link>

                        </td>
                    <td>
                        {product_name}
                    </td>

                    <td>
                        {price}
                    </td>
                    <td>
                        {
                            category.map((cat)=>{
                                return([
                                    <span className="label label-info mr-4">{cat.category_name} </span>
                                ])
                            })
                        }
                    </td>
                    <td>

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

                                <Breadcrumbs {...this.props}/>

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
                                                <Link to="/products/create/"
                                                   className="btn btn-default btn-md waves-effect waves-light m-b-30"><i
                                                    className="md md-add"></i> Add Product</Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="table-responsive">
                                        <table className="table table-hover mails m-0 table table-actions-bar">
                                            <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Product Name</th>
                                                <th>Price</th>
                                                <th>Category </th>
                                                <th></th>
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