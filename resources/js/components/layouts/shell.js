import React from 'react';
import SideNav from "./sideNav";
import TopNav from "./topNav";

const Shell = () => (
    <div>
        <SideNav/>
        <div className="has-sidebar-left">
            <div className="pos-f-t">
                <div className="collapse" id="navbarToggleExternalContent">
                    <div className="bg-dark pt-2 pb-2 pl-4 pr-2">
                        <div className="search-bar">
                            <input className="transparent s-24 text-white b-0 font-weight-lighter w-128 height-50" type="text" placeholder="start typing..."/>
                        </div>
                        <a href="#" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation" className="paper-nav-toggle paper-nav-white active "><i/></a>
                    </div>
                </div>
            </div>
        </div>
        <a href="#" data-toggle="push-menu" className="paper-nav-toggle left ml-2 fixed">
            <i/>
        </a>
        <TopNav/>
    </div>
);

export default Shell