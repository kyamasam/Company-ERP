import {Component} from "react";
import React from "react";
import Footer from "../../layouts/footer"
import Breadcrumbs from "../../layouts/breadcrumbs_2l";
import {Link} from "react-router-dom";
import JoinTeam from "../../projects/components/join_team"

export default class InterestingProjects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: []
        }
    }


    componentDidMount() {
        axios
            .get("/api/v1/projects/recent")
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
            .catch(error => {
                    if (error.response.status === 401) {
                    }
                    else {
                        console.log(error.response);
                    }
                }
            );
    }

    componentWillMount() {
    }

    render() {
        return (
            <div >
                <div className="ro">
                    <h4 className="text-dark header-title m-t-0 m-b-30">Recent Projects</h4>

                </div>
                        <div className="row">

                            {
                                this.state.projects.map(function (project) {
                                    let progress_color = "progress-bar progress-bar-danger";
                                    let text_progress_color = "text-danger";

                                    if (project.project_progress < 4) {
                                        progress_color = "progress-bar progress-bar-danger";
                                        text_progress_color = "text-danger";
                                    }
                                    else if (project.project_progress === 5) {
                                        progress_color = "progress-bar progress-bar-warning";
                                        text_progress_color = "text-warning";
                                    }
                                    else if (project.project_progress > 5) {
                                        progress_color = "progress-bar progress-bar-primary";
                                        text_progress_color = "text-primary";
                                    }
                                    else {
                                        progress_color = "progress-bar progress-bar-custom";
                                        text_progress_color = "text-custom";
                                    }
                                    return (

                                        <div className='col-md-5 col-sm-12 mr-5-md ml-2-md'>
                                            <div className="card-box m-b-10 ">
                                                <div className="table-box opport-box">

                                                    <div className="table-detail">
                                                        {project.project_customers.map(function (customer, index) {
                                                            if (index === 0) {
                                                                return (
                                                                    <img src={customer.user_avatar} alt="img"
                                                                         className="rounded-circle thumb-lg m-r-15"/>

                                                                );
                                                            }
                                                            else {
                                                                return;
                                                            }

                                                        })}
                                                    </div>

                                                    <div className="table-detail">
                                                        <div className="member-info">
                                                            <h4 className="m-t-0"><b> <Link
                                                                to={'/projects/' + project.id}
                                                                className={'card-title ' + 'text-center'}>{project.name}</Link></b>
                                                            </h4>
                                                            <p className="text-dark m-b-5"><b>Customers: </b>

                                                                <span
                                                                    className="text-muted">
                                                                    {project.project_customers.map(function (customer) {
                                                                        return (

                                                                            <a href="#" className="text-muted m-t-5 ">
                                                                                {/*<img src={customer.user_avatar} alt="task-user"*/}
                                                                                {/*className="thumb-sm rounded-circle m-r-5"/>*/}
                                                                                <span
                                                                                    className="font-bold">{customer.name} ,</span></a>


                                                                        );
                                                                    })}</span></p>
                                                            <p className="text-dark m-b-5"><b>Developers: </b>
                                                                <span
                                                                    className="text-muted">
                                                            {project.project_team.map(function (team_member) {
                                                                return (

                                                                    <a href="#" className="text-muted m-t-5 ">
                                                                        {/*<img src={team_member.user_avatar} alt="task-user"*/}
                                                                        {/*className="thumb-sm rounded-circle m-r-5 m-t-5"/>*/}
                                                                        <span
                                                                            className="font-bold">{team_member.name} ,</span></a>


                                                                );
                                                            })}
                                                            </span></p>

                                                        </div>
                                                    </div>

                                                    <div className="table-detail lable-detail">
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
                                                                    project_id={project.id}/>

                                                        }
                                                            </div>

                                                    <div className="table-detail">
                                                        <p className={'lead m-t-0 d-none'}>
                                                            Project Team
                                                        </p>


                                                    </div>

                                                    <div className="table-detail table-actions-bar">
                                                        <Link
                                                            className="btn btn-default btn-md waves-effect waves-light pull-right"
                                                            to={'/projects/' + project.id}>More Details</Link>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    );
                                })}

                        </div>
                    </div>

        )
    }
}