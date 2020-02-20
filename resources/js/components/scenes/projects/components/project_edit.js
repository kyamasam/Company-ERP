import {Component} from "react";
import React from "react";
import Footer from "../../layouts/footer"
import Breadcrumbs from "../../layouts/breadcrumbs_2l";
import {Link} from "react-router-dom";
import axios from 'axios';
import AsyncSelect from 'react-select/lib/Async';



export default class Content extends Component {
    constructor(props){
        super(props);

        this.state = {
            users: [],
            name:'',
            progress:'',
            description:'',
            customers:'',
            original_customers:[],
            developers:'',
            original_developers:[]


        }
    }


    componentDidMount() {
        axios.all([
            axios
                .get("/api/v1/systemuser"),
            axios
                .get("/api/v1/projects/"+this.props.match.params.project_id)
        ])

            .then(axios.spread((systemUserRes,projectRes) => {
                // create an array of projects only with relevant data
                const newUsers = systemUserRes.data.data;
                console.log(newUsers);
                const selectedProject = projectRes.data.data;
                console.log("project")
                console.log(selectedProject);
                var customers_as_string = '';
                selectedProject.customers.map((cs,index)=>{
                    if((index+1) !== selectedProject.customers.length){
                        customers_as_string +=cs.id+',';
                    }else{
                        customers_as_string +=cs.id;
                    }


                });
                var developers_as_string = '';
                selectedProject.assigned_to.map((dvs,index)=>{
                    if((index+1) !== selectedProject.assigned_to.length){
                        developers_as_string +=dvs.id+',';
                    }else{
                        developers_as_string +=dvs.id;
                    }


                });
                console.log("as string");
                console.log(customers_as_string);
                console.log("devs as string");
                console.log(developers_as_string);


                // create a new "State" object without mutating
                // the original State object.

                const newState = Object.assign({}, this.state, {
                    users: newUsers,
                    project: selectedProject,
                    original_customers : selectedProject.customers,
                    customers :customers_as_string,
                    developers :developers_as_string,
                    name:selectedProject.name,
                    progress:selectedProject.progress,
                    description:selectedProject.description,
                    original_developers:selectedProject.assigned_to,
                });

                // store the new state object in the component's state
                this.setState(newState);
            }))
            .catch(error =>{

                    console.log(error.response);

                }
            );
    }


    onSubmit(e){
        e.preventDefault();
        const {name, progress, description, customers, developers} = this.state ;
        console.log("data to post");
        console.log(name,
            progress,
            description,
            customers,
            developers);
        console.log(customers)

        axios.post('/api/v1/projects/'+this.props.match.params.project_id + '?_method=PUT', {
            name,
            progress,
            description,
            developers,
            customers
        })

            .then(response=> {
                console.log(response)
                if(response.data === "successful") {
                    this.setState({
                        success_validation_message: 'Successfully Saved ' + this.state.name,
                        show_err: true
                    });

                    setTimeout(function () {
                        this.props.history.push('/projects/');
                    }.bind(this), 300)


                }
                else {
                    this.setState({err_validation_message: response.data,})
                }

            })
            .catch(error=> {
                // this.refs.name.value="";
                this.refs.progress.value="";
                // this.refs.description.value="";
                console.log("we have an error");
                console.log(error);
                this.setState({err: true});
            });
    }
    normalChange(e){
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    handleChange(d,second) {
        var options = d;
        var cur_state;
        console.log("sth changed");
        console.log(options);
        console.log("second");

        if(second.name === 'customers'){
            cur_state='original_customers';
        }else {
            cur_state='original_developers';
        }
        console.log(second.name);
        console.log("state_2");
        var values = '';
        for (var i = 0, l = options.length; i < l; i++) {
            // creating a string
            if(i===0) {
                //if its the first in the list then we dont need the ,
                values += options[i].value
            }else {
                values +=','+ options[i].value

            }

        }
        const curr_object =options.map(
            x=>(
                {
                    id:x.value,
                    name:x.label
                }
            )
        );
        const data =2;
        console.log("the values ");

        console.log(values);

        console.log("new obj")
        console.log(curr_object)

        this.setState({[
            cur_state]:curr_object}, function () {
            this.checkState();
        });
        this.setState({[
            second.name]:values}, function () {
            this.checkState();
        });
        // console.log(second.target)


    }
    checkState(){
        console.log("new state");
        console.log("new developers");
        console.log(this.state.developers);
        console.log("new customers");
        console.log(this.state.customers)
    }

    render() {
        let error = this.state.err ;

        const selectedDevelopers = this.state.developers;

        let msg = (!error) ? 'Record created Successfully' : 'Oops! , Something went wrong. Try again' ;
        let name = (!error) ? 'alert alert-success' : 'alert alert-danger' ;
        let save_error= this.state.err_validation_message;
        let save_success =this.state.success_validation_message;
        let show_err = this.state.show_err;


        const SearchResults = (inputValue='',callback) => {

            axios.get("/api/v1/systemuser/q/"+inputValue)
                .then(response => {
                    const requestResults=response.data.data;
                    console.log(requestResults);

                    var values =requestResults.map(
                        c=>
                            (
                                {value: c.id ,label: c.name }

                            )

                    );
                    callback(values);
                    return requestResults.filter(i =>
                        i.name.toLowerCase().includes(inputValue.toLowerCase())
                    );



                });

        };
        const Option = (props) => {
            return (
                <components.Option {...props}/>
            );
        };

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
                            <div className="card-box col-md-8 offset-md-2">
                                <h4 className="m-t-0 header-title text-center">Edit Project : {this.state.name}</h4>
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
                                            <label className="col-md-2 col-form-label">Project Name</label>
                                            <div className="col-md-10">
                                                <input type="text" className="form-control"
                                                       placeholder="Project Mat Pay" name="name" ref="name" id="name" defaultValue={this.state.name} onChange={this.normalChange.bind(this)}/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label className="col-md-2 col-form-label">Project Description</label>
                                            <div className="col-md-10">
                                                <textarea className="form-control" rows="5" id="description" name="description"ref="description" value={this.state.description} onChange={this.normalChange.bind(this)}></textarea>
                                            </div>
                                        </div>


                                        <div className="form-group row">
                                            <label className="col-md-2 col-form-label">Customers</label>
                                            <div className="col-md-10">
                                                <AsyncSelect name="customers"  loadOptions={SearchResults}
                                                             onBlur={() =>this.handleChange.bind(this)}

                                                             defaultOptions={
                                                                 this.state.users.map(
                                                                     c=>
                                                                         (
                                                                             {value: c.id ,label: c.name }

                                                                         )

                                                                 )

                                                             }
                                                             value={
                                                                 this.state.original_customers.map(
                                                                     c=>
                                                                         (
                                                                             {value: c.id ,label: c.name }

                                                                         )

                                                                 )

                                                             }

                                                             isMulti onChange={this.handleChange.bind(this)} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-md-2 col-form-label">Developers</label>
                                            <div className="col-md-10">
                                                <AsyncSelect id="developers"  name="developers" ref="developers"  loadOptions={SearchResults}
                                                             onChange={this.handleChange.bind(this)}
                                                             onBlur={() =>this.handleChange.bind(this)}
                                                             defaultOptions={
                                                                 this.state.users.map(
                                                                     c=>
                                                                         (c.is_employee === 1)&&

                                                                                 {value: c.id ,label: c.name}

                                                                 )

                                                             }
                                                             value={
                                                                 this.state.original_developers.map(
                                                                     c=>
                                                                         (
                                                                             {value: c.id ,label: c.name }

                                                                         )

                                                                 )

                                                             }  isMulti />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-md-2 col-form-label">Progress</label>
                                            <div className="col-md-10">
                                                <input className="form-control" type="range" name="progress" ref="progress" id="progress" min="0"
                                                       max="10" defaultValue={this.state.products} onChange={this.normalChange.bind(this)} />
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
                <Footer/>

            </div>

        )
    }
}