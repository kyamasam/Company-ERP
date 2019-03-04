import {Component} from "react";
import React from "react";
import Footer from "../../layouts/footer"
import Breadcrumbs from "../../layouts/breadcrumbs_2l";
import {Link} from "react-router-dom";
import axios from 'axios';



import Select from 'react-select';
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
            developers:''


        }
    }


    componentDidMount() {
        axios
            .get("/api/v1/systemuser")
            .then(response => {

                // create an array of projects only with relevant data
                const newUsers = response.data.data;
                console.log(newUsers);
                // create a new "State" object without mutating
                // the original State object.
                const newState = Object.assign({}, this.state, {
                    users: newUsers,
                });

                // store the new state object in the component's state
                this.setState(newState);
            })
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

        axios.post('/api/v1/projects', {
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
                    window.location.replace('/projects');
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
        console.log("sth changed");
        console.log(options);
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
        const data =2;
        console.log("the values ");

        console.log(values)

        this.setState({[second.name]:values}, function () {
            this.checkState();
        });
        // console.log(second.target)


    }
    checkState(){
        console.log("new state");
        console.log("new developers");
        console.log(this.state.developers)
        console.log("new customers");
        console.log(this.state.customers)
    }


    componentWillMount(){
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
                                                    <label className="col-md-2 col-form-label">Project Name</label>
                                                    <div className="col-md-10">
                                                        <input type="text" className="form-control"
                                                               placeholder="Project Mat Pay" name="name" ref="name" id="name" onChange={this.normalChange.bind(this)}/>
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <label className="col-md-2 col-form-label">Project Description</label>
                                                    <div className="col-md-10">
                                                        <textarea className="form-control" rows="5" id="description" name="description"ref="description" onChange={this.normalChange.bind(this)}></textarea>
                                                    </div>
                                                </div>


                                                <div className="form-group row">
                                                    <label className="col-md-2 col-form-label">Customers</label>
                                                    <div className="col-md-10">
                                                        <AsyncSelect name="customers"  loadOptions={SearchResults}
                                                                     defaultOptions={
                                                                         this.state.users.map(
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
                                                        <AsyncSelect id="developers" value={SearchResults.value}  name="developers" ref="developers"  loadOptions={SearchResults}
                                                                     onChange={this.handleChange.bind(this)}
                                                                     defaultOptions={
                                                                         this.state.users.map(
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
                <Footer/>

            </div>

        )
    }
}