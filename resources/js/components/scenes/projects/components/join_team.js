import {Component} from "react";
import React from "react";
import Footer from "../../layouts/footer"
import Breadcrumbs from "../../layouts/breadcrumbs_2l";
import {Link} from "react-router-dom";
import axios from 'axios';
import AsyncSelect from 'react-select/lib/Async';



export default class JoinTeam extends Component {
    constructor(props){
        super(props);

        this.state = {
            show_err:false


        }
    }
    //
    //
    // componentDidMount() {
    //
    // }
    //
    //
    onSubmit(e){
        e.preventDefault();
        let {name, progress, description,project_id, customers,developers,history} = this.props ;
        console.log(customers)

        //convert objects to strings
        var customers_string='';
        var developers_string='';
        for(var i=0;i<customers.length;i++) {
            if(i===(customers.length -1)){
                customers_string += customers[i].id;
            }
            else{
                customers_string += customers[i].id + ',';
            }
            console.log('inside cust ');
        }
        console.log(developers)
        for(var j=0;j<developers.length;j++) {
            if(j===(developers.length -1)){
                developers_string += developers[j].id;
            }else{
                developers_string += developers[j].id + ',';

            }
            console.log('inside dev');
        }
        if(developers_string === ''){
            developers_string+=localStorage.getItem('user_id');
        }else{
            developers_string+=','+localStorage.getItem('user_id');
        }
        customers=customers_string;
        developers=developers_string;
        console.log("complete dev")
        console.log(developers)
        console.log("total customers");
        console.log(customers);
        console.log("data to post");

        console.log(
            name,
            progress,
            description,
            customers,
            developers,
            this.props.history
        );

        axios.post('/api/v1/projects/'+project_id+ '?_method=PUT', {
            name,
            progress,
            description,
            customers,
            developers,
        })

            .then(response=> {
                console.log(response)
                if(response.data === "successful") {
                    this.setState({
                        success_validation_message: 'Successfully Saved ' + name,
                        show_err: true
                    });

                    setTimeout(function (){
                    // this.props.history.push('/projects/'+project_id);
                    window.location.replace('/projects/'+project_id);
                    }.bind(this), 3000)


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

    render() {
        let error = this.state.err ;
        //
        // const selectedDevelopers = this.state.developers;
        //

        let save_error= this.state.err_validation_message;
        let save_success =this.state.success_validation_message;
        let show_err = this.state.show_err;




        return (
            <div>
                <div >
                    {error != undefined && <div className={name} role="alert">{msg}</div>}

                    {
                        show_err !=undefined ?<span></span> :
                            save_error !=undefined && <div className="alert alert-danger">{save_error}</div>
                    }
                    {save_success !=undefined && <div className="alert alert-success">{save_success}</div> }
                </div>
                <form role="form" method="POST" onSubmit= {this.onSubmit.bind(this)}>
                    <button  type="submit" className="ladda-button btn btn-primary" data-style="expand-left"><span
                        className="ladda-label">
                                                            Join
                                                        </span><span className="ladda-spinner"></span>
                        <div className="ladda-progress" style={{width: '0'+'px'}}></div>
                    </button>
                </form>
            </div>

        )
    }
}