import {Component} from "react";
import React from "react";
import Footer from "../../layouts/footer"
import Breadcrumbs from "../../layouts/breadcrumbs_2l";
import {Link} from "react-router-dom";
import axios from "axios";

export default class Content extends Component {
    constructor(props){
        super(props);
        this.state={
            isLoading:true,
            tickets:[],
        }
    }
    onSubmit(ticket_id,e){
        e.preventDefault();
        console.log("data to post");
        console.log(ticket_id);

        axios.post('/api/v1/tickets/resolve', {
            ticket_id
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
                        this.props.history.push('/tickets/'+ticket_id);
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
    componentWillMount(){
        axios.get('/api/v1/tickets').then(response =>{
            const AllTickets = response.data.data;

            const newState = Object.assign({}, this.state,{
                tickets:AllTickets,
                isLoading:false,
            });
            this.setState(newState);
            console.log(response.data);

        }).catch(error=>{
            console.log(error)
        })
    }
    create_table()
    {
        var values = this.state.tickets.map((c,index)=>{


            var avatar="",ticket_id,customer_name="",customer_id='',assignee_id='',priority_id,customer_email="",title="",priority,category,resolved=false;
            if((c.user !== null) ){

                avatar=c.user.user_avatar;
                customer_name=c.user.name;
                customer_email = c.user.email;
                category=c.category.category_name;
                resolved = c.resolved;
                customer_id = c.user.id;
            }else{
                avatar="http://www.sbcs.edu.tt/wp-content/uploads/2016/04/profile-default.png";


            }
            title = c.title;
             assignee_id = c.assigned_to.id;


            ticket_id=c.tiket_id;
            priority_id = c.category.priority.id;
            priority = c.category.priority.name;

            return([
                <tr key={index}>

                    <td>
                        <img src={avatar} alt="contact-img"
                             title="contact-img" className="rounded-circle thumb-sm"/>
                    </td>
                    <td><Link className="btn btn-primary waves-effect" to={"tickets/"+ticket_id }>Ticket#{ticket_id}</Link></td>
                    <td>
                        {title}
                    </td>
                    <td>
                        {customer_name}
                    </td>

                    <td>
                        {customer_email}
                    </td>
                    <td>
                        <span className="label label-inverse">{category}</span>
                    </td>
                    <td>
                        {resolved ?
                            <span className="label label-success">Resolved</span> :
                            <span className="label label-danger">Unresolved</span>
                        }
                    </td>
                    <td>

                        <span className={"label label-" +this.priorityColor(priority_id)}>{priority}</span>
                    </td>
                    <td>

                    </td>
                    <td>
                        {(customer_id+'' === localStorage.getItem('user_id') || assignee_id+'' === localStorage.getItem('user_id')) ?
                            !resolved ?

                            <form role="form" method="POST" onSubmit= {this.onSubmit.bind(this, ticket_id)}>
                                <button  type="submit" className="ladda-button btn btn-primary" data-style="expand-left"><span
                                    className="ladda-label">
                                                            Resolve
                                                        </span><span className="ladda-spinner"></span>
                                    <div className="ladda-progress" style={{width: '0'+'px'}}></div>
                                </button>
                            </form>
                            :
                            <span></span>
                        :
                        <span></span>}
                    </td>
                </tr>


            ]);
        });

        return values;

    }
    priorityColor($id){
        var color='default';
        if ($id ===3){
            color="danger"
        }
        else if($id === 2){
            color="warning"
        }
        else{
            color = "secondary";
        }
        return(
            color
        )
    }
    render() {
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
                                                <span className="font-16">Sort By:</span>
                                                <div className="btn-group vertical-middle" data-toggle="buttons">
                                                    <label className="btn btn-white btn-md waves-effect active mb-0">
                                                        Status
                                                    </label>
                                                    <label className="btn btn-white btn-md waves-effect mb-0">
                                                        Type
                                                    </label>
                                                    <label className="btn btn-white btn-md waves-effect mb-0">
                                                        Name
                                                    </label>
                                                </div>
                                                <Link className="btn btn-default btn-md waves-effect waves-light m-b-2 mt-2" to='/tickets/create'>
                                                    Create Ticket<i className="md md-add"/>
                                                </Link>

                                            </div>
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
                                                    Photo
                                                </th>
                                                <th>Invoice ID</th>
                                                <td>Title</td>
                                                <td>Customer Name</td>
                                                <td>Customer Email</td>
                                                <td>Category</td>
                                                <td>Resolved</td>
                                                <td>Priority</td>
                                                <td>Action</td>
                                            </tr>
                                            </thead>

                                            <tbody>

                                            {
                                                !this.state.isLoading ? this.create_table() :
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