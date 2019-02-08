// import React, { Component } from 'react';
// import {Link} from "react-router-dom";
//
// export default class Home extends Component {
//     constructor(props){
//         super(props);
//     }
//
//     componentDidMount(){
//         var scripts_array=[
//             '/js/jquery.core.js',
//             '/assets/js/jquery.app.js'
//         ];
//
//         for(var i=0; i< scripts_array.length ;i++) {
//             const script = document.createElement("script");
//             script.src = scripts_array[i];
//             script.async = true;
//             document.body.appendChild(script);
//         }
//     }
//
//     render() {
//         return (
//             <div id="wrapper">
//                 <div className="account-pages"/>
//                 <div className="clearfix"/>
//                 <div className="wrapper-page">
//                     <div className="card-box">
//                         <div className="panel-heading">
//                             <h3 className="text-center"> Sign Up to <strong className="text-custom"><Link to='/'>Skality</Link></strong></h3>
//                         </div>
//
//                         <div className="p-20">
//                             <form className="form-horizontal m-t-20">
//                                 <div className="form-group ">
//                                     <div className="col-12">
//                                         <input className="form-control" type="email" required="" placeholder="Email"/>
//                                     </div>
//                                 </div>
//
//                                 <div className="form-group ">
//                                     <div className="col-12">
//                                         <input className="form-control" type="text" required="" placeholder="Username"/>
//                                     </div>
//                                 </div>
//
//                                 <div className="form-group">
//                                     <div className="col-12">
//                                         <input className="form-control" type="password" required="" placeholder="Password"/>
//                                     </div>
//                                 </div>
//
//                                 <div className="form-group">
//                                     <div className="col-12">
//                                         <div className="checkbox checkbox-primary">
//                                             <input id="checkbox-signup" type="checkbox"/>
//                                             <label htmlFor="checkbox-signup">I accept <Link to='/'>Terms and Conditions</Link></label>
//                                         </div>
//                                     </div>
//                                 </div>
//
//                                 <div className="form-group text-center m-t-40">
//                                     <div className="col-12">
//                                         <button className="btn btn-pink btn-block text-uppercase waves-effect waves-light"
//                                                 type="submit">
//                                             Register
//                                         </button>
//                                     </div>
//                                 </div>
//
//                             </form>
//
//                         </div>
//                     </div>
//
//                     <div className="row">
//                         <div className="col-12 text-center">
//                             <p>
//                                 Already have account?<Link className="text-primary m-l-5" to='/login'><b>Sign In</b></Link>
//                             </p>
//                         </div>
//                     </div>
//
//                 </div>
//             </div>
//         );
//     }
// }
//

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class Register extends Component {

    constructor(props){
        super(props);
        this.state = {
            name: '',
            email : '',
            password: '',
            password_confirmation: '',
        }
    }

    onSubmit(e){
        e.preventDefault();
        const {name, email, password, password_confirmation} = this.state ;
        axios.post('register', {
            name,
            email,
            password,
            password_confirmation
        })
            .then(response=> {
                this.setState({err: false});
                this.props.history.push("home") ;
            })
            .catch(error=> {
                this.refs.name.value="";
                this.refs.password.value="";
                this.refs.email.value="";
                this.refs.confirm.value="";
                this.setState({err: true});
            });
    }

    onChange(e){
        const {name, value} = e.target ;
        this.setState({[name]: value});
    }

    render() {
        let error = this.state.err ;
        let msg = (!error) ? 'Registered Successfully' : 'Oops! , Something went wrong.' ;
        let name = (!error) ? 'alert alert-success' : 'alert alert-danger' ;
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-md-offset-2">
                            <div className="panel panel-default">
                                <div className="panel-heading">Register</div>
                                <div className="panel-body">
                                    <div className="col-md-offset-2 col-md-8 col-md-offset-2">
                                        {error != undefined && <div className={name} role="alert">{msg}</div>}
                                    </div>
                                    <form className="form-horizontal" role="form" method="POST" onSubmit= {this.onSubmit.bind(this)}>
                                        <div className="form-group">
                                            <label for="name" className="col-md-4 control-label">Name</label>

                                            <div className="col-md-6">
                                                <input id="name" type="text" className="form-control" ref="name" name="name" onChange={this.onChange.bind(this)} required autofocus />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label for="email" className="col-md-4 control-label">E-Mail Address</label>

                                            <div className="col-md-6">
                                                <input id="email" type="email" className="form-control" ref="email" name="email" onChange={this.onChange.bind(this)} required />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label for="password" className="col-md-4 control-label">Password</label>

                                            <div className="col-md-6">
                                                <input id="password" type="password" className="form-control"  ref="password" name="password" onChange={this.onChange.bind(this)} required/>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label for="password-confirm" className="col-md-4 control-label">Confirm Password</label>

                                            <div className="col-md-6">
                                                <input id="password-confirm" type="password" className="form-control" ref="confirm" name="password_confirmation" onChange={this.onChange.bind(this)} required/>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <div className="col-md-6 col-md-offset-4">
                                                <button type="submit" className="btn btn-primary">
                                                    Register
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register
