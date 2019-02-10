import {Component} from "react";
import React from "react";
import Footer from "../../layouts/footer"
import Breadcrumbs from "../../layouts/breadcrumbs_2l";
import {Link} from "react-router-dom";
import axios from 'axios'

export default class Content extends Component {
    constructor(props){
        super(props);
        this.state = {
            project: [],
            customers:[],
            team:[]
        }
    }


    componentDidMount() {
        axios
            .get("http://127.0.0.1:8000/api/v1/projects/"+this.props.match.params.project_id)
            .then(response => {

                // create an array of projects only with relevant data
                const newProjects = response.data.data;
                console.log(newProjects);
                // create a new "State" object without mutating
                // the original State object.
                const newState = Object.assign({}, this.state, {
                    project: newProjects,
                    customers : newProjects.customers,
                    team:newProjects.assigned_to
                });

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
    }

    componentWillMount(){
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
                            </div>
                        </div>



                        <div className="row">

                            <div className="card-box product-detail-box">
                                <div className="row">
                                    <div className="col-sm-4">
                                        <div className="sp-loading" style={{display: 'none'}}><img
                                            src="/assets/images/sp-loading.gif" alt=""/><br/>LOADING
                                            IMAGES
                                        </div>
                                        <div className="sp-wrap sp-non-touch" style={{display: 'inline-block'}}>

                                            <div className="sp-large"><a href="/assets/images/gallery/2.jpg"
                                                                         className=".sp-current-big"><img
                                                src="/assets/images/gallery/2.jpg" alt=""/></a></div>
                                        </div>
                                    </div>

                                    <div className="col-sm-8">
                                        <div className="product-right-info">
                                            <h4><b>{this.state.project.name}</b></h4>


                                            <h5 className="m-t-20">
                                                {
                                                    this.state.project.progress <10 ?
                                                    <span
                                                        className="label label-warning m-l-5">In Progress {(this.state.project.progress)* 10} %</span>
                                                    :
                                                    <span
                                                        className="label label-default m-l-5">Complete {(this.state.project.progress)* 10} %</span>
                                                }
                                            </h5>



                                            <hr/>

                                                <h5 className="font-600">Project Description</h5>

                                                <p className="text-muted">{this.state.project.description}</p>



                                                {/*<div className="m-t-30">*/}
                                                    {/*<button type="button" className="btn btn-white"*/}
                                                            {/*title="Add to Wish List"><i className="fa fa-heart-o"></i>*/}
                                                    {/*</button>*/}
                                                    {/*<button type="button"*/}
                                                            {/*className="btn btn-danger waves-effect waves-light m-l-10">*/}
                                                     {/*<span className="btn-label"><i className="fa fa-shopping-cart"></i>*/}
                                                   {/*</span>Buy Now*/}
                                                    {/*</button>*/}

                                                {/*</div>*/}
                                        </div>
                                    </div>
                                </div>
                                  {/*end row*/}

                                <div className="row m-t-30">
                                    <div className="col-12 col-md-6">
                                        <h4 className="font-18"><b>Team:</b></h4>
                                        <div className="table-responsive m-t-20">
                                            <table className="table">
                                                <tbody>
                                                {
                                                        this.state.team.map((team_member, index)=>{
                                                            return (
                                                                <tr>
                                                                    <td key={index} width="400">{team_member.name}</td>
                                                                </tr>
                                                                    )
                                                        })

                                                }

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <h4 className="font-18"><b>Customers:</b></h4>
                                        <div className="table-responsive m-t-20">
                                            <table className="table">
                                                <tbody>
                                                {
                                                    this.state.customers.map((customer, customer_index)=>{
                                                        return (
                                                            <tr>
                                                                <td key={customer_index} width="400">{customer.name}</td>
                                                            </tr>
                                                                )
                                                    })

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