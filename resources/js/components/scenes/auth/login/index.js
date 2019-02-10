import React, { Component } from 'react';
import {Link} from "react-router-dom";
import axios from "axios";

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
// //         return (
//             <div id="wrapper">
//                 <div className="account-pages"/>
//                 <div className="clearfix"/>
//                 <div className="wrapper-page">
//                     <div className="card-box">
//                         <div className="panel-heading">
//                             <h4 className="text-center"> Sign In to <strong className="text-custom"><Link to='/'>Skality</Link></strong></h4>
//                         </div>
//
//
//                         <div className="p-20">
//                             <form className="form-horizontal m-t-20">
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
//                                 <div className="form-group ">
//                                     <div className="col-12">
//                                         <div className="checkbox checkbox-primary">
//                                             <input id="checkbox-signup" type="checkbox"/>
//                                             <label htmlFor="checkbox-signup">Remember me</label>
//                                         </div>
//                                     </div>
//                                 </div>
//
//                                 <div className="form-group text-center m-t-40">
//                                     <div className="col-12">
//                                         <button className="btn btn-pink btn-block text-uppercase waves-effect waves-light" type="submit">Log In</button>
//                                     </div>
//                                 </div>
//
//                                 <div className="form-group m-t-30 m-b-0">
//                                     <div className="col-12">
//                                         <Link className="text-dark" to='/'><i className="fa fa-lock m-r-5"/> Forgot your password?</Link>
//                                     </div>
//                                 </div>
//                             </form>
//
//                         </div>
//                     </div>
//                     <div className="row">
//                         <div className="col-sm-12 text-center">
//                             <p>Don't have an account?<Link className="text-primary m-l-5" to='/register'><b>Sign Up</b></Link></p>
//                         </div>
//                     </div>
//
//                 </div>
//             </div>
//         );
//     }
// }

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            email : '',
            password: '',
            redirectToReferrer: false
        }
    }



    onSubmit(e){
        e.preventDefault();
        const {email , password} = this.state ;
        axios.post('/login', {
            email,
            password
        })
            .then(response=> {
                this.setState({err: false});
                const { from } = this.props.location.state || { from: { pathname: '/' } };
                localStorage.setItem('user', 'true');
                console.log("storage", localStorage.getItem('user'));
                console.log("history");
                console.log(from.pathname);
                // this.props.history.push(from.pathname);
                window.location.replace(from.pathname);

            })
            .catch(error=> {
                this.refs.email.value="";
                this.refs.password.value="";
                console.log("we have an error");
                console.log(error);
                this.setState({err: true});
            });
    }

    onChange(e){
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    render() {

        let error = this.state.err ;
        let msg = (!error) ? 'Login Successful' : 'Wrong Credentials' ;
        let name = (!error) ? 'alert alert-success' : 'alert alert-danger' ;
        return (
            <div id="wrapper">
                <div className="account-pages"/>
                <div className="clearfix"/>
                <div className="wrapper-page">
                    <div className="card-box">
                        <div className="panel-heading">
                            <div className="panel-heading ">
                                <h4 className="text-center"><img src="/skality_logo.png" height="50"/></h4>
                                <Link to='/login'><h4 className="text-center"> Sign In <strong className="text-custom"></strong></h4></Link>
                            </div>
                        </div>
                        <div className="p-20">

                            <div>
                                {error != undefined && <div className={name} role="alert">{msg}</div>}
                            </div>
                            <form className="form-horizontal m-t-20" role="form" method="POST" onSubmit= {this.onSubmit.bind(this)}>

                                <div className="form-group">
                                    <div className="col-12">
                                        <input id="email" type="text" ref="email" placeholder="Email" className="form-control" name="email"  onChange={this.onChange.bind(this)} required />
                                    </div>
                                </div>

                                <div className="form-group">

                                    <div className="col-12">
                                        <input id="password" placeholder="Password" type="password" ref="password" className="form-control" name="password"  onChange={this.onChange.bind(this)}  required />
                                    </div>
                                </div>

                                <div className="form-group ">
                                    <div className="col-12">
                                        <div className="checkbox checkbox-primary">
                                            <input id="checkbox-signup" type="checkbox"/>
                                                <label htmlFor="checkbox-signup">
                                                    Remember me
                                                </label>
                                        </div>

                                    </div>
                                </div>


                                 <div className="form-group text-center m-t-40">
                                     <div className="col-12">
                                         <button className="btn btn-pink btn-block text-uppercase waves-effect waves-light" type="submit">Log In</button>
                                     </div>
                                 </div>

                                 <div className="form-group m-t-30 m-b-0">
                                     <div className="col-12">
                                         <Link className="text-dark" to='/forgotpassword'><i className="fa fa-lock m-r-5"/> Forgot your password?</Link>
                                     </div>
                                 </div>
                            </form>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-12 text-center">
                            <p>
                                Don't have an account?<Link to="/register" className="text-primary m-l-5"><b>Create One</b></Link>
                            </p>
                        </div>
                    </div>
            </div>
            </div>


        );
    }
}
export default Login;
