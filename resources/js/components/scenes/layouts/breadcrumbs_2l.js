import {Component} from "react";
import React from "react";
import {Link} from 'react-router-dom'

export default class Breadcrumbs_2l extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    render() {
        return (
            <div>
                <h4 className="page-title">{this.props.details.title}</h4>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to='/'>Skality</Link></li>
                    <li className="breadcrumb-item active">{this.props.details.title}</li>
                </ol>
            </div>
        )
    }
}