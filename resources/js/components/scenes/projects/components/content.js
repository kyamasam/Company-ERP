import {Component} from "react";
import React from "react";
import Footer from "../../layouts/footer"
import Breadcrumbs from "../../layouts/breadcrumbs_2l";
import {Link} from "react-router-dom";
import axios from 'axios';

export default class Content extends Component {
    constructor(props){
        super(props);
        this.state = {
            projects: []
        }
    }


    componentDidMount() {
        axios
            .get("http://127.0.0.1:8000/api/v1/projects")
            .then(response => {

                // create an array of projects only with relevant data
                const newProjects = response.data.data.map(c => {
                    return {
                        id: c.id,
                        name: c.name,
                        description: c.description,
                        project_team: c.assigned_to,
                        project_customers: c.customers,
                        project_progress: c.progress,
                    };
                });
                console.log(newProjects)
                // create a new "State" object without mutating
                // the original State object.
                const newState = Object.assign({}, this.state, {
                    projects: newProjects
                });

                // store the new state object in the component's state
                this.setState(newState);
            })
            .catch(error => console.log(error));
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
                            <div className="col-md-10">
                                <form role="form">
                                    <div className="form-group contact-search m-b-30">
                                        <input type="text" id="search" className="form-control" placeholder="Search..."/>
                                        <button type="submit" className="btn btn-white">
                                            <i className="fa fa-search"/>
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="col-md-2">
                                <Link className="btn btn-default btn-md waves-effect waves-light m-b-30 pull-right" to='/quotations'>
                                    <i className="md md-add"/>
                                {/*{ this.state.projects.map(project => <li>{project.name}</li>)}*/}



                                </Link>

                            </div>
                        </div>
                        <div className="row">

                                {
                                    this.state.projects.map(function (project){
                                    let progress_color= "progress-bar progress-bar-danger";
                                    let text_progress_color ="text-danger";

                                    if(project.project_progress < 4){
                                        progress_color = "progress-bar progress-bar-danger";
                                        text_progress_color ="text-danger";
                                    }
                                    else if(project.project_progress === 5){
                                        progress_color = "progress-bar progress-bar-warning";
                                        text_progress_color ="text-warning";
                                    }
                                    else if(project.project_progress > 5){
                                        progress_color = "progress-bar progress-bar-primary";
                                        text_progress_color ="text-primary";
                                    }
                                    else{
                                        progress_color = "progress-bar progress-bar-custom";
                                        text_progress_color ="text-custom";
                                    }
                                    return(
                                        <div className="col-sm-4 col-lg-3 col-xs-12">
                                            <div className="card m-b-20">
                                                    <div className="card-body">
                                                        <h5 className={'card-title '+ 'text-center '+ text_progress_color}>{project.name}</h5>
                                                        <p className="card-text">{project.description}</p>
                                                    </div>

                                                    <div className="card-body">
                                                        <p className={'lead m-t-0 '+ text_progress_color}>
                                                            Project Team
                                                        </p>

                                                        {project.project_team.map(function(team_member){
                                                            return(

                                                                    <a href="#" className="text-muted m-t-5 m-r-5" >
                                                                        <img src={team_member.user_avatar} alt="task-user"
                                                                             className="thumb-sm rounded-circle m-r-5 m-t-5"/> <span
                                                                        className="font-bold">{team_member.name} ,</span></a>


                                                            );
                                                        })}

                                                        <p className={'lead m-t-10 '+ text_progress_color }>
                                                            Customers
                                                        </p>

                                                        {project.project_customers.map(function(customer){
                                                            return(

                                                                    <a href="#" className="text-muted m-t-5 m-r-5" >
                                                                        <img src={customer.user_avatar} alt="task-user"
                                                                             className="thumb-sm rounded-circle m-r-5"/> <span
                                                                        className="font-bold">{customer.name} ,</span></a>


                                                            );
                                                        })}

                                                        <p className={'lead m-t-10 ' + text_progress_color}>
                                                            Progress
                                                        </p>


                                                        <div className="progress m-t-15">

                                                            <div className={progress_color}
                                                                 role="progressbar" aria-valuenow={project.project_progress *10 } aria-valuemin="0"
                                                                 aria-valuemax="100" style={{width: project.project_progress *10 + '%'}}>
                                                                {project.project_progress *10}%
                                                            </div>
                                                        </div>
                                                    </div>
                                            </div>
                                        </div>
                                    );
                                })}

                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}