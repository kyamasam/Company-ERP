import {Component} from "react";
import React from "react";
import Footer from "../../layouts/footer"
import Breadcrumbs from "../../layouts/breadcrumbs_2l";
import AsyncSelect from "react-select/lib/Async";

export default class Content extends Component {
    constructor(props){
        super(props);
    }
    componentWillMount(){
    }
    render() {
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
                                            <form className="form-horizontal" role="form" role="form" method="POST" onSubmit= {this.onSubmit.bind(this)} >
                                                <div className="form-group row">
                                                    <label className="col-2 col-form-label">Project Name</label>
                                                    <div className="col-10">
                                                        <input type="text" className="form-control"
                                                               placeholder="Project Mat Pay" name="name" ref="name" id="name" onChange={this.normalChange.bind(this)}/>
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <label className="col-2 col-form-label">Project Description</label>
                                                    <div className="col-10">
                                                        <textarea className="form-control" rows="5" id="description" name="description"ref="description" onChange={this.normalChange.bind(this)}></textarea>
                                                    </div>
                                                </div>



                                                <div className="form-group row">
                                                    <label className="col-2 col-form-label">Progress</label>
                                                    <div className="col-md-10">
                                                        <input className="form-control" type="range" name="progress" ref="progress" id="progress" min="0"
                                                               max="10" onChange={this.normalChange.bind(this)} />
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