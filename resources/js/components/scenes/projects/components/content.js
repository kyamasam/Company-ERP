import {Component} from "react";
import React from "react";
import Footer from "../../layouts/footer"
import Breadcrumbs from "../../layouts/breadcrumbs_2l";
import {Link} from "react-router-dom";
import JoinTeam from "./join_team"

export default class Content extends Component {
    constructor(props){
        super(props);
        this.state = {
            projects: [],
        }
    }


    componentDidMount() {
        axios
            .get("/api/v1/projects")
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
                console.log(newProjects);
                // create a new "State" object without mutating
                // the original State object.
                const newState = Object.assign({}, this.state, {
                    projects: newProjects
                });

                // store the new state object in the component's state
                this.setState(newState);
            })
            .catch(error =>{
                    if (error.response.status === 401){
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
                                <Link className="btn btn-default btn-md waves-effect waves-light m-b-30 pull-right" to='/projects/create'>
                                    Create Project<i className="md md-add"/>
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
                                        <div className='col-md-5 col-sm-12 mr-5-md ml-2-md'>
                                            <div className="card-box m-b-10 ">
                                                <div className="table-box opport-box">
                                                    <div className="table-detail">
                                                        {project.project_customers.map(function(customer,index) {
                                                            if (index === 0){
                                                                return(
                                                                    <img key={index} src={customer.user_avatar} alt="img"
                                                                         className="rounded-circle thumb-lg m-r-15"/>

                                                                );
                                                            }
                                                            else{
                                                                return;
                                                            }

                                                        })}
                                                    </div>
                                                    <div className="row">
                                                        <div className="table-detail col-md-6">
                                                            <div className="member-info">
                                                                <h4 className="m-t-0"><b> <Link to={'/projects/'+project.id} className={'card-title '+ 'text-center'}>{project.name}</Link></b></h4>
                                                                <p className="text-dark m-b-5"><b>Customers: </b>

                                                                    <span
                                                                    className="text-muted">
                                                                        {project.project_customers.map(function(customer, index){
                                                                            return(

                                                                                <a key={index} href="#" className="text-muted m-t-5 " >
                                                                                    {/*<img src={customer.user_avatar} alt="task-user"*/}
                                                                                         {/*className="thumb-sm rounded-circle m-r-5"/>*/}
                                                                                    <span
                                                                                    className="font-bold">{customer.name} ,</span></a>


                                                                            );
                                                                        })}</span></p>
                                                                <p className="text-dark m-b-5"><b>Developers: </b>
                                                                <span
                                                                    className="text-muted">
                                                                {project.project_team.map(function(team_member, index){
                                                                    return(

                                                                        <a key={index} href="#" className="text-muted m-t-5 " >
                                                                            {/*<img src={team_member.user_avatar} alt="task-user"*/}
                                                                                 {/*className="thumb-sm rounded-circle m-r-5 m-t-5"/>*/}
                                                                            <span
                                                                            className="font-bold">{team_member.name} ,</span></a>


                                                                    );
                                                                })}
                                                                </span></p>

                                                            </div>
                                                        </div>

                                                        <div className="table-detail m-t-5-md col-md-2">
                                                            {
                                                                ( (project.project_team).findIndex(i => i.id === 5) )> -1?
                                                                    <span></span>
                                                                    :
                                                                    <JoinTeam
                                                                        name={project.name}
                                                                        progress={project.project_progress}
                                                                        description={project.description}
                                                                        developers={project.project_team}
                                                                        customers={project.project_customers}
                                                                        project_id={project.id}
                                                                    />
                                                            }


                                                        </div>

                                                        <div className="table-detail">
                                                            <p className={'lead m-t-0 d-none'}>
                                                                Project Team
                                                            </p>

                                                        </div>

                                                        <div className="table-detail table-actions-bar">
                                                            <Link className="btn btn-default btn-md waves-effect waves-light pull-right"
                                                                  to={'/projects/'+project.id}>More Details</Link>
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
//
// <div className="col-sm-4 col-lg-3 col-xs-12">
//     <div className="card m-b-20">
//         <div className="card-body">
//
//             <h3> <Link to={'/projects/'+project.id} className={'card-title '+ 'text-center'}>{project.name}</Link></h3>
//             <p className="card-text">{project.description}</p>
//         </div>
//
//         <div className="card-body">
//             <p className={'lead m-t-0'}>
//                 Project Team
//             </p>
//
//             {project.project_team.map(function(team_member){
//                 return(
//
//                     <a href="#" className="text-muted m-t-5 m-r-5" >
//                         <img src={team_member.user_avatar} alt="task-user"
//                              className="thumb-sm rounded-circle m-r-5 m-t-5"/> <span
//                         className="font-bold">{team_member.name} ,</span></a>
//
//
//                 );
//             })}
//
//             <p className={'lead m-t-10' }>
//                 Customers
//             </p>
//
//             {project.project_customers.map(function(customer){
//                 return(
//
//                     <a href="#" className="text-muted m-t-5 m-r-5" >
//                         <img src={customer.user_avatar} alt="task-user"
//                              className="thumb-sm rounded-circle m-r-5"/> <span
//                         className="font-bold">{customer.name} ,</span></a>
//
//
//                 );
//             })}
//
//             <p className={'lead m-t-10 '}>
//                 Progress
//             </p>
//
//
//             <div className="progress m-t-15">
//
//                 <div className={progress_color}
//                      role="progressbar" aria-valuenow={project.project_progress *10 } aria-valuemin="0"
//                      aria-valuemax="100" style={{width: project.project_progress *10 + '%'}}>
//                     {project.project_progress *10}%
//                 </div>
//             </div>
//         </div>
//     </div>
// </div>