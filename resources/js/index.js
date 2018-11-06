import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import NoMatch from "./components/scenes/error/noMatch";
import Home from "./components/scenes/home/index";
import Projects from "./components/scenes/projects/index";
import Quotations from "./components/scenes/quotations/index";
import Invoices from "./components/scenes/invoices/index";
import Payments from "./components/scenes/payments/index";
import Tickets from "./components/scenes/tickets/index";
import Announcements from "./components/scenes/announcements/index";
import Users from "./components/scenes/users/index";
import Settings from "./components/scenes/settings/index";
import Help from "./components/scenes/help/index";
import Register from "./components/scenes/auth/register/index"
import Login from "./components/scenes/auth/login/index"


export default class Index extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route path="/" exact render={props => <Home{...props} details={{title:"Dashboard"}}/>}/>
                        <Route path="/projects" exact render={props => <Projects{...props} details={{title:"Projects"}}/>}/>
                        <Route path="/quotations" exact render={props => <Quotations{...props} details={{title:"Quotation"}}/>}/>
                        <Route path="/invoices" exact render={props => <Invoices{...props} details={{title:"Invoices"}}/>}/>
                        <Route path="/payments" exact render={props => <Payments{...props} details={{title:"Payments"}}/>}/>
                        <Route path="/tickets" exact render={props => <Tickets{...props} details={{title:"Tickets"}}/>}/>
                        <Route path="/announcements" exact render={props => <Announcements{...props} details={{title:"Announcements"}}/>}/>
                        <Route path="/users" exact render={props => <Users{...props} details={{title:"Users"}}/>}/>
                        <Route path="/settings" exact render={props => <Settings{...props} details={{title:"Settings"}}/>}/>
                        <Route path="/help" exact render={props => <Help{...props} details={{title:"Help"}}/>}/>
                        <Route path="/register" exact render={props => <Register{...props} details={{title:"Register"}}/>}/>
                        <Route path="/login" exact render={props => <Login{...props} details={{title:"Login"}}/>}/>
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
