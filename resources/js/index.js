import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route,Switch, Redirect} from 'react-router-dom';
import NoMatch from "./components/scenes/error/noMatch";
import Home from "./components/scenes/home/index";
import Projects from "./components/scenes/projects/index";
import ProjectsCreate from "./components/scenes/projects/create";
import ProjectDetail from "./components/scenes/projects/detail";
import ProjectEdit from "./components/scenes/projects/edit";
import Quotations from "./components/scenes/quotations/index";
import Invoices from "./components/scenes/invoices/index";
import Products from "./components/scenes/products/index";
import ProductDetail from "./components/scenes/products/detail";
import ProductCreate from "./components/scenes/products/create";
import Payments from "./components/scenes/payments/index";
import Tickets from "./components/scenes/tickets/index";
import TicketDetail from "./components/scenes/tickets/detail";
import TicketCreate from "./components/scenes/tickets/create";
import Announcements from "./components/scenes/announcements/index";
import Users from "./components/scenes/users/index";
import Settings from "./components/scenes/settings/index";
import Profile from "./components/scenes/profile/index";
import Subscription from "./components/scenes/subscriptions/index";
import SubscriptionCreate from "./components/scenes/subscriptions/create";
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
        <AuthGuard {...props}>
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
                        <Route path="/projects/edit/:project_id" exact component={WithAuth(ProjectEdit)}/>
                        <Route path="/quotations" exact component={WithAuth(Quotations)}/>
                        <Route path="/invoices" exact component={WithAuth(Invoices)}/>
                        <Route path="/subscriptions" exact component={WithAuth(Subscription)}/>
                        <Route path="/subscriptions/create" exact component={WithAuth(SubscriptionCreate)}/>
                        <Route path="/products" exact component={WithAuth(Products)}/>
                        <Route path="/products/create" exact component={WithAuth(ProductCreate)}/>
                        <Route path="/products/:product_id" exact component={WithAuth(ProductDetail)}/>
                        <Route path="/invoices/:invoice_id" exact component={WithAuth(InvDetail)}/>
                        <Route path="/payments" exact component={ WithAuth(Payments)}/>
                        <Route path="/tickets" exact component={WithAuth(Tickets)}/>
                        <Route path="/tickets/create" exact component={WithAuth(TicketCreate)}/>
                        <Route path="/tickets/:ticket_id" exact component={WithAuth(TicketDetail)}/>
                        <Route path="/announcements" exact component={WithAuth(Announcements)}/>
                        <Route path="/users" exact component={WithAuth(Users)}/>
                        <Route path="/settings" exact component={WithAuth(Settings)}/>
                        <Route path="/help" exact component={WithAuth(Help)}/>
                        <Route path="/register" exact render={props => <Register{...props} details={{title:"Register"}}/>}/>
                        <Route path="/login" exact render={props => <Login{...props} details={{title:"Login"}}/>}/>
                        <Route path="/profile/:user_id" exact component={WithAuth(Profile)}/>
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
