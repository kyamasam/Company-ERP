import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';

export default class TopNav extends Component {
    constructor(props){
        super(props);
        this.state ={
            logged_in_user:[]
        }
    }
    componentDidMount(){
        axios.get('/api/v1/user')
            .then(response =>{
                console.log(response.data)
                const newState= Object.assign({},this.state,{
                    logged_in_user:response.data
                });
                this.setState(newState);
            })
            .catch(error =>{
                    if (error.response.status === 401){
                        window.location.replace("/login");
                    }
                    else{
                        console.log(error.response);
                    }
                }
            );
    }
    logout(e){
        e.preventDefault();
        axios.post('/logout')
            .then(response=> {
                localStorage.removeItem('user');
                console.log("removed user from local storage");
                window.location.reload();
            })
            .catch(error=> {
                console.log(error);
            });
    }

    handleClick(e){

        e.preventDefault();
        this.props.history.push('/');

    }
    render() {
        return (
            <div className="topbar">
                <div className="topbar-left">
                    <div className="text-center padding-sm-10">


                        <Link className='logo' to='/'>
                            <img className="small-logo icon-c-logo" src="/skality_favicon.png" height="48"/> <span><img src="/skality_logo.png" height="30"/></span>
                        </Link>
                         {/*Image Logo here -->*/}
                        {/*<a href="index.html" class="logo">*/}
                        {/*<img src="/skality_favicon.png" height="42"/>*/}
                        {/*<span><img src="/skality_favicon.png" height="20"/></span>*/}
                        {/*</a>-->*/}

                    </div>
                </div>

                <nav className="navbar-custom">
                    <ul className="list-inline float-right mb-0">
                        <li className="list-inline-item dropdown notification-list">
                            <a className="nav-link dropdown-toggle arrow-none waves-light waves-effect"
                               data-toggle="dropdown"
                               href="#" role="button"
                               aria-haspopup="false" aria-expanded="false">
                                <i className="dripicons-bell noti-icon"/>
                                <span className="badge badge-pink noti-icon-badge">4</span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right dropdown-arrow dropdown-lg"
                                 aria-labelledby="Preview">
                                <div className="dropdown-item noti-title">
                                    <h5><span className="badge badge-danger float-right">5</span>Notification</h5>
                                </div>

                                <a href="javascript:void(0);" className="dropdown-item notify-item">
                                    <div className="notify-icon bg-success"><i className="icon-bubble"/></div>
                                    <p className="notify-details">Robert S. Taylor commented on Admin
                                        <small className="text-muted">1 min ago</small>
                                    </p>
                                </a>

                                <a href="javascript:void(0);" className="dropdown-item notify-item">
                                    <div className="notify-icon bg-info"><i className="icon-user"/></div>
                                    <p className="notify-details">New user registered.
                                        <small className="text-muted">1 min ago</small>
                                    </p>
                                </a>

                                <a href="javascript:void(0);" className="dropdown-item notify-item">
                                    <div className="notify-icon bg-danger"><i className="icon-like"/></div>
                                    <p className="notify-details">Carlos Crouch liked <b>Admin</b>
                                        <small className="text-muted">1 min ago</small>
                                    </p>
                                </a>


                                <a href="javascript:void(0);" className="dropdown-item notify-item notify-all">
                                    View All
                                </a>

                            </div>
                        </li>

                        <li className="list-inline-item notification-list">
                            <a className="nav-link waves-light waves-effect" href="#" id="btn-fullscreen">
                                <i className="dripicons-expand noti-icon"/>
                            </a>
                        </li>

                        <li className="list-inline-item notification-list">
                            <a className="nav-link right-bar-toggle waves-light waves-effect" href="#">
                                <i className="dripicons-message noti-icon"/>
                            </a>
                        </li>

                        <li className="list-inline-item dropdown notification-list">
                            <a className="nav-link dropdown-toggle waves-effect waves-light nav-user"
                               data-toggle="dropdown"
                               href="#" role="button"
                               aria-haspopup="false" aria-expanded="false">
                                {this.state.logged_in_user.user_avatar?
                                    <img src={this.state.logged_in_user.user_avatar} alt="user"
                                         className="rounded-circle"/>
                                    :
                                    <img src="https://eform.etixdubai.com/App_Themes/DefaultNew/images/profile.png" alt="user"
                                         className="rounded-circle"/>
                                }

                                    </a>
                            <div className="dropdown-menu dropdown-menu-right profile-dropdown "
                                 aria-labelledby="Preview">
                                <div className="dropdown-item noti-title">
                                    <h5 className="text-overflow">
                                        <small>Welcome ! <span className='text-capitalize'>{this.state.logged_in_user.name}</span></small>
                                    </h5>
                                </div>
                                <Link className="dropdown-item notify-item" to={'/profile/'+this.state.logged_in_user.id}>
                                    <i className="md md-account-circle"/> <span>Profile</span>
                                </Link>
                                <Link className="dropdown-item notify-item" to='/settings'>
                                    <i className="md md-settings"/> <span>Settings</span>
                                </Link>
                                <a href="javascript:void(0);" className="dropdown-item notify-item" onClick={this.logout.bind(this)}>
                                    <i className="md md-settings-power"/> <span>Logout</span>
                                </a>
                            </div>
                        </li>
                    </ul>

                    <ul className="list-inline menu-left mb-0">
                        <li className="float-left">
                            <button className="button-menu-mobile open-left waves-light waves-effect">
                                <i className="dripicons-menu"/>
                            </button>
                        </li>
                        <li className="hide-phone app-search">
                            <form role="search" className="">
                                <input type="text" placeholder="Search..." className="form-control"/>
                                <a href="#"><i className="fa fa-search"/></a>
                            </form>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

