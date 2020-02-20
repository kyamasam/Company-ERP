
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
            username:'',
            password_confirmation: '',
        }
    }

    onSubmit(e){
        e.preventDefault();
        const {name,username, email, password, password_confirmation} = this.state ;
        axios.post('/register', {
            name,
            username,
            email,
            password,
            password_confirmation
        })
            .then(response=> {
                this.setState({err: false});
                localStorage.setItem('user', 'true');
                this.props.history.push("/") ;
            })
            .catch(error=> {
                this.refs.name.value="";
                this.refs.username.value="";
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



        let msg = (!error) ? 'Registered Successfully' : 'Oops! , Something went wrong. Try again' ;
        let name = (!error) ? 'alert alert-success' : 'alert alert-danger' ;
        return (
            <div>
                <div id="wrapper">
                    <div className="account-pages"/>
                    <div className="clearfix"/>
                    <div className="wrapper-page">
                        <div className="card-box">
                            <div className="panel-heading mb-3">
                                <h4 className="text-center"><img src="/sefapay_logo_full_blue.png" height="50"/></h4>
                                <Link to='/register'><h4 className="text-center"> Register <strong className="text-custom"></strong></h4></Link>
                            </div>

                                    <div >
                                        {error != undefined && <div className={name} role="alert">{msg}</div>}
                                    </div>
                                    <form className="form-horizontal" role="form" method="POST"
                                          onSubmit={this.onSubmit.bind(this)}>

                                        <div className="form-group ">
                                            <div className="col-12">
                                                <input className="form-control"
                                                       type="text" ref="name" name="name"
                                                       placeholder="Full Name" onChange={this.onChange.bind(this)} required="required" autoFocus/>
                                            </div>
                                        </div>
                                        <div className="form-group ">
                                            <div className="col-12">
                                                <input className="form-control" required="required"
                                                       type="text" ref="username" name="username"
                                                       placeholder="User Name" onChange={this.onChange.bind(this)}  autoFocus/>
                                            </div>
                                        </div>


                                        <div className="form-group">
                                            <div className="col-12">
                                                <input id="email" type="email" className="form-control" ref="email"
                                                       name="email" placeholder="Email" onChange={this.onChange.bind(this)} required="required"/>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <div className="col-12">
                                                <input id="password" type="password" className="form-control"
                                                       ref="password" name="password" placeholder="Password"
                                                       onChange={this.onChange.bind(this)} required="required"/>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <div className="col-12">
                                                <input id="password-confirm" type="password" className="form-control"
                                                       ref="confirm" name="password_confirmation" placeholder="Confirm Password"
                                                       onChange={this.onChange.bind(this)} required="required"/>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <div className="col-12">
                                                <div className="checkbox checkbox-primary">
                                                    <input id="checkbox-signup" type="checkbox" checked="checked"/>
                                                        <label htmlFor="checkbox-signup">I accept <a href="#">Terms and
                                                            Conditions</a></label>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="form-group text-center m-t-40">
                                            <div className="col-12">
                                                <button
                                                    className="btn btn-pink btn-block text-uppercase waves-effect waves-light"
                                                    type="submit">
                                                    Register
                                                </button>
                                            </div>
                                        </div>
                                    </form>


                                </div>
                        <div className="row">
                            <div className="col-12 text-center">
                                <p>
                                    Already have account?<Link to="/login" className="text-primary m-l-5"><b>Sign In</b></Link>
                                </p>
                            </div>
                        </div>

                        </div>
                    </div>

                </div>

        )
    }
}

export default Register
