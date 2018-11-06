import React, { Component } from 'react';
import {Link} from "react-router-dom";

export default class Home extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        var scripts_array=[
            '/js/jquery.core.js',
            '/assets/js/jquery.app.js'
        ];

        for(var i=0; i< scripts_array.length ;i++) {
            const script = document.createElement("script");
            script.src = scripts_array[i];
            script.async = true;
            document.body.appendChild(script);
        }
    }

    render() {
        return (
            <div id="wrapper">
                <div className="account-pages"/>
                <div className="clearfix"/>
                <div className="wrapper-page">
                    <div className="card-box">
                        <div className="panel-heading">
                            <h3 className="text-center"> Sign Up to <strong className="text-custom"><Link to='/'>Skality</Link></strong></h3>
                        </div>

                        <div className="p-20">
                            <form className="form-horizontal m-t-20">
                                <div className="form-group ">
                                    <div className="col-12">
                                        <input className="form-control" type="email" required="" placeholder="Email"/>
                                    </div>
                                </div>

                                <div className="form-group ">
                                    <div className="col-12">
                                        <input className="form-control" type="text" required="" placeholder="Username"/>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="col-12">
                                        <input className="form-control" type="password" required="" placeholder="Password"/>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="col-12">
                                        <div className="checkbox checkbox-primary">
                                            <input id="checkbox-signup" type="checkbox"/>
                                            <label htmlFor="checkbox-signup">I accept <Link to='/'>Terms and Conditions</Link></label>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group text-center m-t-40">
                                    <div className="col-12">
                                        <button className="btn btn-pink btn-block text-uppercase waves-effect waves-light"
                                                type="submit">
                                            Register
                                        </button>
                                    </div>
                                </div>

                            </form>

                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12 text-center">
                            <p>
                                Already have account?<Link className="text-primary m-l-5" to='/login'><b>Sign In</b></Link>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

