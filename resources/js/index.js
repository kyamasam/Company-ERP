import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route,Switch, Redirect} from 'react-router-dom';
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
import Profile from "./components/scenes/profile/index";
import Help from "./components/scenes/help/index";
import Register from "./components/scenes/auth/register/index"
import Login from "./components/scenes/auth/login/index"
import InvDetail from "./components/scenes/invoices/detail"

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        localStorage.getItem('user') === 'true'
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }} />
    )} />
);

export default class Index extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <PrivateRoute path="/" exact component={props => <Home{...props} details={{title:"Dashboard"}}/>}/>
                        <PrivateRoute path="/projects" exact component={props => <Projects{...props} details={{title:"Projects"}}/>}/>
                        <PrivateRoute path="/quotations" exact component={props => <Quotations{...props} details={{title:"Quotation"}}/>}/>
                        <PrivateRoute path="/invoices" exact component={props => <Invoices{...props} details={{title:"Invoices"}}/>}/>
                        <PrivateRoute path="/invoices/:invoice_id" exact component={props => <InvDetail{...props} details={{title:"Invoices"}}/>}/>
                        <PrivateRoute path="/payments" exact component={props => <Payments{...props} details={{title:"Payments"}}/>}/>
                        <PrivateRoute path="/tickets" exact component={props => <Tickets{...props} details={{title:"Tickets"}}/>}/>
                        <PrivateRoute path="/announcements" exact component={props => <Announcements{...props} details={{title:"Announcements"}}/>}/>
                        <PrivateRoute path="/users" exact component={props => <Users{...props} details={{title:"Users"}}/>}/>
                        <PrivateRoute path="/settings" exact component={props => <Settings{...props} details={{title:"Settings"}}/>}/>
                        <PrivateRoute path="/help" exact component={props => <Help{...props} details={{title:"Help"}}/>}/>
                        <Route path="/register" exact render={props => <Register{...props} details={{title:"Register"}}/>}/>
                        <Route path="/login" exact render={props => <Login{...props} details={{title:"Login"}}/>}/>
                        <PrivateRoute path="/profile" exact component={props => <Profile{...props} details={{title:"Profile"}}/>}/>
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
