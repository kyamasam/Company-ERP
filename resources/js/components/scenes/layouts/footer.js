import React, {Component} from 'react'
import {Link} from "react-router-dom";

export default class Footer extends Component {
    render() {
        return (
            <footer className="footer text-right">
                &copy; 2016 - 2018. <Link to="/">Sefapay</Link>. All rights reserved.
            </footer>
        )
    }
}