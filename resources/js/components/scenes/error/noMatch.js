import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const divBackground={
    background: './public/assets/img/icon/icon-circles.png',
};

const test={
    color: '#ff0000'
};

export default class NoMatch extends Component {
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Page does not exist</div>
                            <div className="card-body">
                                404 Error Page!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<NoMatch />, document.getElementById('app'));
}