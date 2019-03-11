import {Component} from "react";
import React from "react";
import Footer from "../../layouts/footer"
import Breadcrumbs from "../../layouts/breadcrumbs_2l";
import axios from "axios";

import AsyncSelect from 'react-select/lib/Async';
export default class Content extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:'',
            price:'',
            category:'',
            subscription_duration:0,
            all_products:[],
        }
    }

    componentDidMount() {
        axios
            .get("/api/v1/categories/")
            .then(response => {

                // create an array of projects only with relevant data
                const newProducts = response.data.data;
                // create a new "State" object without mutating
                // the original State object.
                const newState = Object.assign({}, this.state, {
                    all_products: newProducts,
                });

                // store the new state object in the component's state
                this.setState(newState);
            })
            .catch(error =>{

                    console.log(error);

                }
            );
    }

    onSubmit(e){
        e.preventDefault();
        const {name, price, category,subscription_duration} = this.state ;
        console.log("data to post");
        console.log(
            name,
            price,
            category,
            subscription_duration,);

        axios.post('/api/v1/products', {
            name,
            price,
            category,
            subscription_duration
        })

            .then(response=> {
                console.log(response)
                if(response.data === "successful") {
                    this.setState({
                        success_validation_message: 'Successfully Saved ' + this.state.name,
                        show_err: true
                    });
                    window.location.replace('/products');
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
    handleChange(d,second) {
        var options = d;
        console.log("sth changed");
        console.log(options);
        console.log(second);
        var values = '';
        for (var i = 0, l = options.length; i < l; i++) {
            // creating a string
            if(i===0) {
                //if its the first in the list then we dont need the ,
                values += options[i].value
            }else {
                values +=','+ options[i].value

            }

        }
        console.log("the values ");

        console.log(values)

        this.setState({[second.name]:values}, function () {
            this.checkState();
        });
        // console.log(second.target)


    }
    checkState(){
        console.log("new state");
        console.log("new categories");
        console.log(this.state.category)
    }
    normalChange(e){
        const {name, value} = e.target;
        this.setState({[name]: value});
    }
    render() {

        const SearchResults = (inputValue='',callback) => {

            axios.get("/api/v1/categories/q/"+inputValue)
                .then(response => {
                    const requestResults=response.data.data;
                    console.log(requestResults);

                    var values =requestResults.map(
                        c=>
                            (
                                {value: c.id ,label: c.category_name }

                            )

                    );
                    callback(values);
                    return requestResults.filter(i =>
                        i.name.toLowerCase().includes(inputValue.toLowerCase())
                    );



                });

        };

        let error = this.state.err ;

        let msg = (!error) ? 'Record created Successfully' : 'Oops! , Something went wrong. Try again' ;
        let name = (!error) ? 'alert alert-success' : 'alert alert-danger' ;
        let save_error= this.state.err_validation_message;
        let save_success =this.state.success_validation_message;
        let show_err = this.state.show_err;
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

                                <div className="row">
                                    <div className="card-box col-8 offset-md-2">
                                        <h4 className="m-t-0 header-title text-center">Create a new Project</h4>
                                        <div >
                                            {error != undefined && <div className={name} role="alert">{msg}</div>}

                                            {
                                                show_err !=undefined ?<span></span> :
                                                    save_error !=undefined && <div className="alert alert-danger">{save_error}</div>
                                            }
                                            {save_success !=undefined && <div className="alert alert-success">{save_success}</div> }
                                        </div>

                                        <div className="p-20">
                                            <form className="form-horizontal" role="form" method="POST" onSubmit= {this.onSubmit.bind(this)} >
                                                <div className="form-group row">
                                                    <label className="col-2 col-form-label">Product Name</label>
                                                    <div className="col-10">
                                                        <input type="text" className="form-control"
                                                               placeholder="Website" name="name" ref="name" id="name" onChange={this.normalChange.bind(this)}/>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-2 col-form-label">Price</label>
                                                    <div className="col-10">
                                                        <input type="number" className="form-control"
                                                               placeholder="2000" name="price" ref="price" id="price" onChange={this.normalChange.bind(this)}/>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-2 col-form-label">Subscription Duration in days</label>
                                                    <div className="col-10">
                                                        <input type="number" className="form-control"
                                                               placeholder="30" name="subscription_duration" ref="subscription_duration" id="subscription_duration" onChange={this.normalChange.bind(this)}/>
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <label className="col-2 col-form-label">Categories</label>
                                                    <div className="col-10">
                                                        <AsyncSelect name="category"  loadOptions={SearchResults}
                                                                     defaultOptions={
                                                                         this.state.all_products.map(
                                                                             c=>
                                                                                 (
                                                                                     {value: c.id ,label: c.category_name}

                                                                                 )

                                                                         )

                                                                     }

                                                                     isMulti onChange={this.handleChange.bind(this)} />
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

                                        {/*end row */}

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