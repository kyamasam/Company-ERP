import {Component} from "react";
import React from "react";
import Footer from "../../layouts/footer"
import Breadcrumbs from "../../layouts/breadcrumbs_2l";
import {Link} from 'react-router-dom'

export default class Content extends Component {
    constructor(props){
        super(props);
        this.state ={
            isLoading:true,
            quotations:[]
        }
    }

    componentDidMount() {
        axios
            .get("http://127.0.0.1:8000/api/v1/users")
            .then(response => {

                // create an array of projects only with relevant data
                const newQuotations = response.data.data;
                console.log("all invoices"+ newQuotations)

                // create a new "State" object without mutating
                // the original State object.
                // const newState = Object.assign({}, this.state, {
                //     quotations: newQuotations
                // });
                // console.log(newQuotations)


                // store the new state object in the component's state
                this.setState({
                    quotations: newQuotations,
                    isLoading: false
                });
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

    write_proficiencies(array){

    };

    create_table()
    {
        var array_of_invoices = [];
        var values = this.state.quotations.map(c=>{
            let confirmed_status= "default";
            let confirmed_status_text= "Pending";

            if(c.accepted ===0){
                confirmed_status = "danger";
                confirmed_status_text= "Pending";

            }
            else{
                confirmed_status = "success";
                confirmed_status_text= "Accepted";

            }
            var avatar="";
            var email="";
            var proficiency =c.proficiency;







            return([
                <tr>
                    <td>
                        <div className="checkbox checkbox-primary m-r-15">
                            <input id="checkbox2" type="checkbox" />
                            <label htmlFor="checkbox2"></label>
                        </div>

                        <img src={c.user_avatar} alt="contact-img"
                             title="contact-img" className="rounded-circle thumb-sm"/>
                    </td>
                    <td><Link to={"/profile/"+c.id}>{c.id}</Link></td>

                    <td><Link to={"/profile/"+c.id}>{c.name}</Link></td>
                    <td><Link to={"/profile/"+c.id}>{c.email}</Link></td>
                    <td>
                        {
                            proficiency.map(element => {
                                return ([
                                    <span className={"label label-inverse mr-2"}>{element.name}  </span> ,
                                ])
                            })
                        }
                    </td>
                    <td>
                        <Link to={"/profile/"+c.id} className="table-action-btn"><i
                            className="md md-edit"/></Link>
                        <Link to={"/profile/"+c.id} className="table-action-btn"><i
                            className="md md-file-download"/></Link>
                    </td>

                </tr>


            ])
        })

        return values


    }

    render() {
        var isLoading = this.state.isLoading;
        console.log("are we loading?" + isLoading)

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
                                    {/*<div className="dropdown-menu dropdown-menu-right" aria-labelledby="btnGroupDrop1">*/}
                                    {/*<a className="dropdown-item" href="#">Dropdown One</a>*/}
                                    {/*<a className="dropdown-item" href="#">Dropdown Two</a>*/}
                                    {/*<a className="dropdown-item" href="#">Dropdown Three</a>*/}
                                    {/*<a className="dropdown-item" href="#">Dropdown Four</a>*/}
                                    {/*</div>*/}
                                </div>

                                <Breadcrumbs{...this.props}/>
                                <div className="col-lg-12">
                                    <div className="card-box">
                                        <div className="row">
                                            <div className="col-sm-8">
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
                                            <div className="col-sm-4">
                                                <a href="#custom-modal"
                                                   className="btn btn-default btn-md waves-effect waves-light m-b-30"
                                                   data-animation="fadein" data-plugin="custommodal"
                                                   data-overlayspeed="200" data-overlaycolor="#36404a"><i
                                                    className="md md-add"></i> Add User</a>
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
                                                    <th>User ID</th>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Proficiencies</th>
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
                </div>
                <Footer/>
            </div>
        )
    }
}