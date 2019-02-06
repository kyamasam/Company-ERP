import {Component} from "react";
import React from "react";
import Footer from "../../layouts/footer"
import Breadcrumbs from "../../layouts/breadcrumbs_2l";
import axios from "axios";

export default class Content extends Component {
    constructor(props){
        super(props);
        this.state = {
            clients: []
        }
    }
    componentDidMount(){
        axios
            .get('http://127.0.0.1:8000/oauth/clients').then(response =>{
                const Tokens= response.data.map(c=>{
                    return {
                        id:c.id,
                        client_name:c.name,
                        client_secret:c.secret,
                    }
                });
            console.log(Tokens)
            // create a new "State" object without mutating
            // the original State object.
            const newState = Object.assign({}, this.state, {
                clients: Tokens
            });

            // store the new state object in the component's state
            this.setState(newState);
        })
    }
    componentWillMount(){
    }
    requestToken(){
        axios.get('/redirect', {
            params: {
                ID: 12345
            }
        })
            .then(function (response) {
                console.log(response);
            })
    }
    render() {

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
                                {this.state.clients.map(function (access_token) {
                                    return(
                                        <div className="col-sm-4 col-xs-12">
                                            <div className="card m-b-20">
                                                <h5 className="card-header">Client Name : {access_token.client_name} </h5>
                                                <div className="card-body">
                                                    <h4 className="card-title">Client Secret:  </h4>
                                                    <p className="card-text">{access_token.client_secret}</p>
                                                    {/*<button onClick={this.requestToken()} className="btn btn-primary">Generate tokens</button>*/}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}

                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}