import React, {Component} from 'react'
import {Link} from 'react-router-dom'

const padding_correction={
    paddingTop: '0px'
};

export default class SideNav extends Component {
    render() {
        return (
            <div className="left side-menu">
                <div className="sidebar-inner slimscrollleft">
                    <div id="sidebar-menu" style={padding_correction}>
                        <ul className="list-unstyled">
                            <li>
                                <Link className='waves-effect' to='/'><i className="ti-home"/>
                                    <span> Dashboard </span>
                                </Link>
                            </li>

                            <li>
                                <Link className='waves-effect' to='/projects'><i className="ti-layout-grid3-alt"/>
                                    <span> Projects </span>
                                </Link>
                            </li>

                            <li>
                                <Link className='waves-effect' to='/quotations'><i className="ti-bar-chart"/>
                                    <span> Quotations </span>
                                </Link>
                            </li>

                            <li>
                                <Link className='waves-effect' to='/invoices'><i className="ti-files"/>
                                    <span> Invoices </span>
                                </Link>
                            </li>
                            <li>
                                <Link className='waves-effect' to='/products'><i className=" md-add-shopping-cart"/>
                                    <span> Products </span>
                                </Link>
                            </li>

                            <li>
                                <Link className='waves-effect' to='/payments'><i className="ti-credit-card"/>
                                    <span> Payments </span>
                                </Link>
                            </li>

                            {/*<li>*/}
                                {/*<Link className='waves-effect' to='/tickets'><i className="ti-ticket"/>*/}
                                    {/*<span> Tickets </span>*/}
                                {/*</Link>*/}
                            {/*</li>*/}

                            {/*<li>*/}
                                {/*<Link className='waves-effect' to='/announcements'><i className="ti-announcement"/>*/}
                                    {/*<span> Announcements </span>*/}
                                {/*</Link>*/}
                            {/*</li>*/}

                            <li>
                                <Link className='waves-effect' to='/users'><i className="ti-user"/>
                                    <span> Users </span>
                                </Link>
                            </li>

                            <li>
                                <Link className='waves-effect' to='/settings'><i className="ti-settings"/>
                                    <span> Settings </span>
                                </Link>
                            </li>

                            <li>
                                <Link className='waves-effect' to='/help'><i className="ti-help-alt"/>
                                    <span> Help </span>
                                </Link>
                            </li>
                        </ul>
                        <div className="clearfix"/>
                    </div>
                    <div className="clearfix"/>
                </div>
            </div>
        );
    }
}
