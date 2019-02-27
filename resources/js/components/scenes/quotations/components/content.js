import {Component} from "react";
import React from "react";
import Footer from "../../layouts/footer"
import Breadcrumbs from "../../layouts/breadcrumbs_2l";
import axios from "axios";

export default class Content extends Component {
    constructor(props){
        super(props);
        this.state ={
            isLoading:true,
            quotations:[],
        }
    }

    componentDidMount() {
        axios
            .get("http://127.0.0.1:8000/api/v1/quotations")
            .then(response => {

                // create an array of projects only with relevant data
                const newQuotations = response.data.data;
                console.log("all invoices"+ newQuotations)


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
    onSubmit(quotation_id,e){
        e.preventDefault();
        console.log("data to post");
        console.log(quotation_id);

        axios.post('/api/v1/quotations/approve', {
            quotation_id
        })

            .then(response=> {
                console.log(response)
                if(response.data === "successful") {
                    this.setState({
                        success_validation_message: 'Successfully Saved ',
                        show_err: true
                    });
                    console.log("success");
                    setTimeout(function() {
                        this.props.history.push('/invoices/'+quotation_id);
                    }.bind(this), 3000)

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
        console.log("target");
        console.log(e.target);
        this.setState({[name]: value});
    }
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
            var email=""

            if(c.customer){
                avatar=c.customer.user_avatar;
                email = c.customer.email;
                name = c.customer.name;
            }
            else{
                avatar="https://www.qualiscare.com/wp-content/uploads/2017/08/default-user.png"
            }



            return([
                <tr>
                    <td>
                        <div className="checkbox checkbox-primary m-r-15">
                            <input id="checkbox2" type="checkbox" />
                            <label htmlFor="checkbox2"></label>
                        </div>

                        <img src={avatar} alt="contact-img"
                             title="contact-img" className="rounded-circle thumb-sm"/>
                    </td>
                    <td><a href="#">QT#{c.id}</a></td>

                    <td><a href="#">{name}</a></td>
                    <td><a href="#">{email}</a></td>
                    <td><span className={"label label-"+confirmed_status}>{confirmed_status_text}</span></td>
                    <td>{c.created_at}</td>
                    <td>
                        {!c.accepted ?

                            <form role="form" method="POST" onSubmit= {this.onSubmit.bind(this, c.id)}>
                                <button  type="submit" className="ladda-button btn btn-primary" data-style="expand-left"><span
                                    className="ladda-label">
                                                            Approve
                                                        </span><span className="ladda-spinner"></span>
                                    <div className="ladda-progress" style={{width: '0'+'px'}}></div>
                                </button>
                            </form>
                            :
                            <span></span>}
                    </td>

                </tr>


            ])
        })

        return values


    }

    render() {
        var isLoading = this.state.isLoading;

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
                                                   className="btn btn-default btn-md waves-effect waves-light m-b-30" data-overlaycolor="#36404a"><i
                                                    className="md md-add"></i> New Quotation</a>
                                            </div>
                                        </div>

                                        {
                                            show_err !=undefined ?<span></span> :
                                                save_error !=undefined && <div className="alert alert-danger">{save_error}</div>
                                        }
                                        {save_success !=undefined && <div className="alert alert-success">{save_success}</div> }

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
                                                    <th>Quotation ID</th>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Acceptance Status</th>
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
                                    {
                                        show_err !=undefined ?<span></span> :
                                            save_error !=undefined && <div className="alert alert-danger">{save_error}</div>
                                    }
                                    {save_success !=undefined && <div className="alert alert-success">{save_success}</div> }


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