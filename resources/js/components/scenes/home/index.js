import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Home extends Component {
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header">Home Page Component</div>
                                <div className="card-body">
                                    I'm an Home component!
                                </div>
                            </div>
                        </div>
                    </div>
                    <Blue/>
                </div>
            </div>
        );
    }
}

class Blue extends Component{
    render(){
        return(
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Another Component Component</div>
                        <div className="card-body">
                            I'm an Another component!
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

if (document.getElementById('pages')) {
    ReactDOM.render(<Home />, document.getElementById('pages'));
}