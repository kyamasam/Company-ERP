import {Component} from "react";
import React from "react";
import Footer from "../../layouts/footer"
import Breadcrumbs from "../../layouts/breadcrumbs_2l";
import axios from "axios";
import {Link} from 'react-router-dom'
export default class Content extends Component {
    constructor(props){
        super(props);
        this.state={
            current_user:[],
            user_projects:[],
            is_loading:true
        }
    }
    componentWillMount(){

    }
    componentDidMount(){
        axios.get('/api/v1/systemuser/'+this.props.match.params.user_id)
            .then(response =>{
                console.log("dta");
                console.log(response.data.data);

                const newState= Object.assign({},this.state,{
                    current_user:response.data.data,
                    user_projects:response.data.data.projects,
                    is_loading: false
                });
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
    render() {
        var projects_count=0;
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
                                    <div className="col-md-4 col-lg-3 offset-lg-3">
                                        <div className="profile-detail card-box">
                                            <div>
                                                { this.state.is_loading ?
                                                    <div className="spinner-border text-primary" role="status">
                                                        <span className="sr-only">Loading...</span>
                                                    </div>
                                                    :
                                                    this.state.current_user.user_avatar ?
                                                        <img src={this.state.current_user.user_avatar}
                                                             className="rounded-circle"
                                                             alt="profile-image"/>
                                                        :
                                                        <img src="https://eform.etixdubai.com/App_Themes/DefaultNew/images/profile.png"
                                                             className="rounded-circle"
                                                             alt="profile-image"/>

                                                }


                                                    <ul className="list-inline status-list m-t-20">
                                                        <li className="list-inline-item">
                                                            <h3 className="text-primary m-b-5">{
                                                                this.state.user_projects ?
                                                                    this.state.user_projects.length
                                                                    : 0
                                                            }</h3>
                                                            <p className="text-muted">Projects</p>
                                                        </li>
                                                    </ul>


                                                    {/*<button type="button"*/}
                                                            {/*className="btn btn-pink btn-custom btn-rounded waves-effect waves-light">Follow*/}
                                                    {/*</button>*/}

                                                    <hr/>
                                                {this.state.is_loading ?
                                                    <div className="spinner-border text-primary" role="status">
                                                        <span className="sr-only">Loading...</span>
                                                    </div>
                                                    :
                                                    <span>
                                                        <h4 className="text-uppercase font-18 font-600">About Me</h4>
                                                        <p className="text-muted font-13 m-b-30">
                                                            {this.state.current_user.bio}
                                                        </p>

                                                        <div className="text-left">
                                                            <p className="text-muted font-13"><strong>Full Name
                                                                :</strong> <span className="m-l-15">{this.state.current_user.name}</span>
                                                            </p>
                                                            <p className="text-muted font-13"><strong>User Name
                                                                :</strong> <span className="m-l-15">{this.state.current_user.username}</span>
                                                            </p>


                                                            <p className="text-muted font-13"><strong>Email :</strong>
                                                                <span className="m-l-15">{this.state.current_user.email}</span>
                                                            </p>
                                                            <p className="text-muted font-13"><strong>Specialties : </strong>
                                                                <span className="ml-2"></span>
                                                                    {
                                                                        this.state.current_user.proficiency ?
                                                                            this.state.current_user.proficiency.map(element => {
                                                                                return ([
                                                                                    <span className={"label label-primary mr-2"}> {element.name}  </span> ,
                                                                                ])
                                                                            })
                                                                        :0
                                                                    }
                                                            </p>

                                                        </div>


                                                        {/*<div className="button-list m-t-20">*/}
                                                            {/*<button type="button"*/}
                                                                    {/*className="btn btn-facebook waves-effect waves-light">*/}
                                                                {/*<i className="fa fa-facebook"></i>*/}
                                                            {/*</button>*/}

                                                            {/*<button type="button"*/}
                                                                    {/*className="btn btn-twitter waves-effect waves-light">*/}
                                                                {/*<i className="fa fa-twitter"></i>*/}
                                                            {/*</button>*/}

                                                            {/*<button type="button"*/}
                                                                    {/*className="btn btn-linkedin waves-effect waves-light">*/}
                                                                {/*<i className="fa fa-linkedin"></i>*/}
                                                            {/*</button>*/}

                                                            {/*<button type="button"*/}
                                                                    {/*className="btn btn-dribbble waves-effect waves-light">*/}
                                                                {/*<i className="fa fa-dribbble"></i>*/}
                                                            {/*</button>*/}

                                                        {/*</div>*/}
                                                </span>
                                                }

                                            </div>

                                        </div>

                                    </div>
                                    <div className="card-box col-md-4 col-lg-3 mr-2">
                                        <h4 className="m-t-0 m-b-20 header-title"><b>Projects</b></h4>

                                        <ul className="list-unstyled transaction-list mb-0">
                                            {
                                                this.state.user_projects.length ?
                                                    this.state.user_projects.map((project,index) => {
                                                        return ([
                                                            <li>
                                                                {project.progress ===10 ?
                                                                <i className="md md-done-all text-success "></i>
                                                                : <i className="md md-schedule text-success "></i>
                                                                }

                                                                <Link to={'/projects/'+project.id} className="text-center" style={{marginLeft:'20'+'px'}}>{project.name}</Link>
                                                                {project.progress ===10 ?
                                                                    <span className={"pull-right  label label-success mr-2"}> {project.progress*10} % complete</span>:
                                                                    <span className={"pull-right  label label-warning mr-2"}> {project.progress*10} % complete</span>}
                                                                <span className="clearfix"></span>
                                                            </li>
                                                        ])
                                                    })
                                                    :
                                                    <div> <p>No Projects Yet </p>

                                                    </div>
                                            }


                                        </ul>
                                    </div>

                                </div>
                                <div className="row">
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