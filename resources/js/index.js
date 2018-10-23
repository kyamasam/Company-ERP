import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import NoMatch from "./components/scenes/error/noMatch";
import Home from "./components/scenes/home/index";
import Projects from "./components/scenes/projects/index";
import Estimates from "./components/scenes/estimates/index";
import Invoices from "./components/scenes/invoices/index";
import Payments from "./components/scenes/payments/index";
import Tickets from "./components/scenes/tickets/index";
import Announcements from "./components/scenes/announcements/index";
import Users from "./components/scenes/users/index";
import Settings from "./components/scenes/settings/index";
import Help from "./components/scenes/help/index";

import {piety} from "../../public/plugins/peity/jquery.peity.min.js";


export default class Index extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route path="/" exact component={Home}/>
                        <Route path="/projects" exact component={Projects}/>
                        <Route path="/estimates" exact component={Estimates}/>
                        <Route path="/invoices" exact component={Invoices}/>
                        <Route path="/payments" exact component={Payments}/>
                        <Route path="/tickets" exact component={Tickets}/>
                        <Route path="/announcements" exact component={Announcements}/>
                        <Route path="/users" exact component={Users}/>
                        <Route path="/settings" exact component={Settings}/>
                        <Route path="/help" exact component={Help}/>
                        <Route component={NoMatch}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<Index/>, document.getElementById('app'));
}
