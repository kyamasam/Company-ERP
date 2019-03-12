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
            ticket_detail:[],
            isLoading:true,
            isResolved:0
        }
    }
    onSubmit(ticket_id,tick_action,e){
        e.preventDefault();
        console.log("data to post");
        console.log(ticket_id);
        console.log("action");

        console.log(tick_action);

            axios.post('/api/v1/tickets/'+tick_action, {
                ticket_id
            })



            .then(response=> {
                console.log(response)
                if(response.data === "successful") {
                    this.setState({
                        success_validation_message: 'Successfully '+tick_action+'ened ticket',
                        show_err: true
                    });
                    console.log("success");
                    var action_value;
                    if(tick_action === 'reopen'){
                        action_value=1
                    }
                    else{
                        action_value=0;
                    }
                    this.setState({resolved:action_value});

                    setTimeout(function() {
                        location.reload()
                    }.bind(this), 300)

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


    componentDidMount() {
        axios.get('/api/v1/tickets/'+this.props.match.params.ticket_id).then(response =>{
            const newTicket = response.data.data;

            const newState = Object.assign({}, this.state,{
                ticket_detail: newTicket,
                isLoading: false,
                isResolved:newTicket.resolved
            });

            this.setState(newState);
            console.log(newTicket)

        })
    }
    showTopCard(){
        var top_data = this.state.ticket_detail;
        console.log(top_data.assigned_to);




        var customer_avatar="",customer_id="",ticket_id, tick_action,customer_name="",assignee_id="",priority_id,customer_email="",title="",priority,category,resolved=false;
        if((top_data.user !== null) ){

            customer_avatar=top_data.user.user_avatar;
            customer_name=top_data.user.name;
            customer_email = top_data.user.email;
            customer_id = top_data.user.id;

        }else{
            customer_avatar="http://www.sbcs.edu.tt/wp-content/uploads/2016/04/profile-default.png";


        }
        assignee_id = top_data.assigned_to.id;
        category=top_data.category.category_name;
        resolved = top_data.resolved;
        // this.setState({resolved:resolved});

        ticket_id=top_data.tiket_id;
        priority_id = top_data.category.priority.id;
        priority = top_data.category.priority.name;

        return ([
            <div className="col-12" key={ticket_id}>
                <div className="card-box m-b-10">
                    <div className="table-box opport-box ">
                        <div className="table-detail">
                            <img src={customer_avatar} alt="img"
                                 className="rounded-circle thumb-lg m-r-4"/>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-6 ">

                                <div className="table-detail">
                                    <div className="member-info">
                                        <h4 className="m-t-0"><b>{customer_name}. </b></h4>
                                        <p className="text-dark m-b-5"><b>Category: {category}</b></p>
                                    </div>
                                </div>

                                <div className="table-detail lable-detail">
                                    <p>Resolved</p>
                                    {resolved ?
                                        <span className="label label-success">Resolved</span> :
                                        <span className="label label-danger">Unresolved</span>
                                    }
                                </div>
                                <div className="table-detail lable-detail">
                                    <p>Priority</p> <span className={"label label-" +this.priorityColor(priority_id)}>{priority}</span>

                                </div>
                            </div>
                            <div className="col-12 col-md-6">

                                <div className="table-detail pl-2 ">
                                    {(customer_id+'' === localStorage.getItem('user_id') || assignee_id+'' === localStorage.getItem('user_id')) ?
                                        this.state.isResolved  ?
                                        <p>Re Open</p>:
                                        <p>Close </p>
                                        :
                                        <p></p>
                                    }
                                    {(customer_id+'' === localStorage.getItem('user_id') || assignee_id+'' === localStorage.getItem('user_id')) ?
                                        this.state.isResolved ?
                                            <form role="form" method="POST" onSubmit= {this.onSubmit.bind(this, ticket_id, tick_action='reopen')}>
                                                <button  type="submit" className="ladda-button btn btn-danger" data-style="expand-left"><span
                                                    className="ladda-label">
                                                                    Reopen
                                                                </span><span className="ladda-spinner"></span>
                                                    <div className="ladda-progress" style={{width: '0'+'px'}}></div>
                                                </button>
                                            </form>
                                            :
                                            <form role="form" method="POST" onSubmit= {this.onSubmit.bind(this, ticket_id, tick_action='resolve')}>
                                                <button  type="submit" className="ladda-button btn btn-primary" data-style="expand-left"><span
                                                    className="ladda-label">
                                                                    Resolve
                                                                </span><span className="ladda-spinner"></span>
                                                    <div className="ladda-progress" style={{width: '0'+'px'}}></div>
                                                </button>
                                            </form>
                                        :
                                        <span></span>


                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ])

        // return show;
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

    componentWillMount(){
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
                                {
                                    show_err !=undefined ?<span></span> :
                                        save_error !=undefined && <div className="alert alert-danger">{save_error}</div>
                                }
                                {save_success !=undefined && <div className="alert alert-success">{save_success}</div> }

                                {
                                    !this.state.isLoading ? this.showTopCard() :
                                        <div className="offset-md-1">
                                                <div className="text-center offset-md-5">
                                                    <div className="spinner-border" role="status">
                                                        <span className="sr-only">Loading...</span>
                                                    </div>
                                                </div>

                                        </div>
                                }


                                {/*<div className="col-12">*/}
                                    {/*<div className="card-box m-b-0">*/}
                                        {/*<div className="p-20">*/}
                                            {/*<h4 className="m-b-20 header-title"><b>Activities</b></h4>*/}
                                            {/*<div className="nicescroll p-l-r-10"*/}
                                                 {/*tabIndex="5000">*/}
                                                {/*<div className="timeline-2">*/}
                                                    {/*<div className="time-item">*/}
                                                        {/*<div className="item-info">*/}
                                                            {/*<div className="text-muted">*/}
                                                                {/*<small>5 minutes ago</small>*/}
                                                            {/*</div>*/}
                                                            {/*<p><strong><a href="#" className="text-info">John*/}
                                                                {/*Doe</a></strong> Uploaded a*/}
                                                                {/*photo <strong>"DSC000586.jpg"</strong></p>*/}
                                                        {/*</div>*/}
                                                    {/*</div>*/}

                                                    {/*<div className="time-item">*/}
                                                        {/*<div className="item-info">*/}
                                                            {/*<div className="text-muted">*/}
                                                                {/*<small>30 minutes ago</small>*/}
                                                            {/*</div>*/}
                                                            {/*<p><a href="#" className="text-info">Lorem</a> commented*/}
                                                                {/*your post.</p>*/}
                                                            {/*<p><em>"Lorem ipsum dolor sit amet, consectetur adipiscing*/}
                                                                {/*elit. Aliquam laoreet tellus ut tincidunt euismod.*/}
                                                                {/*"</em></p>*/}
                                                        {/*</div>*/}
                                                    {/*</div>*/}

                                                    {/*<div className="time-item">*/}
                                                        {/*<div className="item-info">*/}
                                                            {/*<div className="text-muted">*/}
                                                                {/*<small>59 minutes ago</small>*/}
                                                            {/*</div>*/}
                                                            {/*<p><a href="#" className="text-info">Jessi</a> attended a*/}
                                                                {/*meeting with<a href="#" className="text-success">John*/}
                                                                    {/*Doe</a>.</p>*/}
                                                            {/*<p><em>"Lorem ipsum dolor sit amet, consectetur adipiscing*/}
                                                                {/*elit. Aliquam laoreet tellus ut tincidunt euismod.*/}
                                                                {/*"</em></p>*/}
                                                        {/*</div>*/}
                                                    {/*</div>*/}

                                                    {/*<div className="time-item">*/}
                                                        {/*<div className="item-info">*/}
                                                            {/*<div className="text-muted">*/}
                                                                {/*<small>5 minutes ago</small>*/}
                                                            {/*</div>*/}
                                                            {/*<p><strong><a href="#" className="text-info">John*/}
                                                                {/*Doe</a></strong>Uploaded 2 new photos</p>*/}
                                                        {/*</div>*/}
                                                    {/*</div>*/}

                                                    {/*<div className="time-item">*/}
                                                        {/*<div className="item-info">*/}
                                                            {/*<div className="text-muted">*/}
                                                                {/*<small>30 minutes ago</small>*/}
                                                            {/*</div>*/}
                                                            {/*<p><a href="#" className="text-info">Lorem</a> commented*/}
                                                                {/*your post.</p>*/}
                                                            {/*<p><em>"Lorem ipsum dolor sit amet, consectetur adipiscing*/}
                                                                {/*elit. Aliquam laoreet tellus ut tincidunt euismod.*/}
                                                                {/*"</em></p>*/}
                                                        {/*</div>*/}
                                                    {/*</div>*/}

                                                    {/*<div className="time-item">*/}
                                                        {/*<div className="item-info">*/}
                                                            {/*<div className="text-muted">*/}
                                                                {/*<small>59 minutes ago</small>*/}
                                                            {/*</div>*/}
                                                            {/*<p><a href="#" className="text-info">Jessi</a> attended a*/}
                                                                {/*meeting with<a href="#" className="text-success">John*/}
                                                                    {/*Doe</a>.</p>*/}
                                                            {/*<p><em>"Lorem ipsum dolor sit amet, consectetur adipiscing*/}
                                                                {/*elit. Aliquam laoreet tellus ut tincidunt euismod.*/}
                                                                {/*"</em></p>*/}
                                                        {/*</div>*/}
                                                    {/*</div>*/}

                                                    {/*<div className="time-item">*/}
                                                        {/*<div className="item-info">*/}
                                                            {/*<div className="text-muted">*/}
                                                                {/*<small>5 minutes ago</small>*/}
                                                            {/*</div>*/}
                                                            {/*<p><strong><a href="#" className="text-info">John*/}
                                                                {/*Doe</a></strong>Uploaded 2 new photos</p>*/}
                                                        {/*</div>*/}
                                                    {/*</div>*/}

                                                    {/*<div className="time-item">*/}
                                                        {/*<div className="item-info">*/}
                                                            {/*<div className="text-muted">*/}
                                                                {/*<small>30 minutes ago</small>*/}
                                                            {/*</div>*/}
                                                            {/*<p><a href="#" className="text-info">Lorem</a> commented*/}
                                                                {/*your post.</p>*/}
                                                            {/*<p><em>"Lorem ipsum dolor sit amet, consectetur adipiscing*/}
                                                                {/*elit. Aliquam laoreet tellus ut tincidunt euismod.*/}
                                                                {/*"</em></p>*/}
                                                        {/*</div>*/}
                                                    {/*</div>*/}

                                                {/*</div>*/}
                                            {/*</div>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                <Footer/>
            </div>
            </div>
        )
    }
}