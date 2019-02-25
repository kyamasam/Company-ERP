import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route,Switch, Redirect} from 'react-router-dom';
import NoMatch from "./components/scenes/error/noMatch";
import Home from "./components/scenes/home/index";
import Projects from "./components/scenes/projects/index";
import ProjectsCreate from "./components/scenes/projects/create";
import ProjectDetail from "./components/scenes/projects/detail";
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
import AuthGuard from "./components/scenes/auth/auth_guard"

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

const WithAuth= (ComponentName)=>{
    return (props)=>(
        <AuthGuard>
            <ComponentName {...props} details={{title:ComponentName.name}}/>
        </AuthGuard>
    )

};




export default class Index extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Switch>

                        <Route path="/" exact component={WithAuth(Home)}/>
                        <Route path="/projects" exact component={WithAuth(Projects)}/>
                        {/*<Route path="/" exact component={props => <Home{...props} details={{title:"Dashboard"}}/>}/>
                        <PrivateRoute path="/projects" exact component={props => <Projects{...props} details={{title:"Projects"}}/>}/>*/}
                        <Route path="/projects/create" exact component={WithAuth(ProjectsCreate)}/>
                        <Route path="/projects/:project_id" exact component={WithAuth(ProjectDetail)}/>
                        <Route path="/quotations" exact component={WithAuth(Quotations)}/>
                        <Route path="/invoices" exact component={WithAuth(Invoices)}/>
                        <Route path="/invoices/:invoice_id" exact component={WithAuth(InvDetail)}/>
                        <Route path="/payments" exact component={ WithAuth(Payments)}/>
                        <Route path="/tickets" exact component={WithAuth(Tickets)}/>
                        <Route path="/announcements" exact component={WithAuth(Announcements)}/>
                        <Route path="/users" exact component={WithAuth(Users)}/>
                        <Route path="/settings" exact component={WithAuth(Settings)}/>
                        <Route path="/help" exact component={WithAuth(Help)}/>
                        <Route path="/register" exact render={WithAuth(Register)}/>
                        <Route path="/login" exact render={props => <Login{...props} details={{title:"Login"}}/>}/>
                        <PrivateRoute path="/profile/:user_id" exact component={props => <Profile{...props} details={{title:"Profile"}}/>}/>
                        {/*<Route component={NoMatch}/>*/}
                    </Switch>
                </div>
            </Router>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<Index/>, document.getElementById('app'));
}
