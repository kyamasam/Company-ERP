import axios from "axios";
import {Component} from "react";
import React from "react";

export default class ResolveSubmit extends Component {
    constructor(props){
        super(props);
        this.state={
            isLoading:true,
            err_validation_message:'',
            success_validation_message:'',
            show_err:''
        }
    }

    componentDidMount(){
        this.props.onRef(this)
    }
    componentWillUnmount() {
        this.props.onRef(undefined)
    }
    showForm(){
        return([
            <form role="form" method="POST" onSubmit= {this.onSubmit.bind(this, ticket_id)}>
                <button  type="submit" className="ladda-button btn btn-primary" data-style="expand-left"><span
                    className="ladda-label">
                                                            Resolve
                                                        </span><span className="ladda-spinner"></span>
                    <div className="ladda-progress" style={{width: '0'+'px'}}></div>
                </button>
            </form>
        ])
    }
    onSubmit(ticket_id, e) {
        e.preventDefault();
        console.log("data to post");
        console.log(ticket_id);

        axios.post('/api/v1/tickets/resolve', {
            ticket_id
        })

            .then(response => {
                console.log(response)
                if (response.data === "successful") {
                    this.setState({
                        success_validation_message: 'Successfully Saved ',
                        show_err: true
                    });
                    console.log("success");
                    setTimeout(function () {
                        this.props.history.push('/tickets/' + ticket_id);
                    }.bind(this), 3000)

                }
                else {
                    this.setState({err_validation_message: response.data,})
                }

            })
            .catch(error => {
                console.log("we have an error");
                console.log(error);
                this.setState({err: true});
            });
    }

    normalChange(e) {
        const {name, value} = e.target;
        console.log("target");
        console.log(e.target);
        this.setState({[name]: value});
    }

    render(){
        let save_error= this.state.err_validation_message;
        let save_success =this.state.success_validation_message;
        let show_err = this.state.show_err;
        return(
            <div>
                {
                    show_err !='' ?<span></span> :
                        save_error !='' && <div className="alert alert-danger">{save_error}</div>
                }
                {save_success !='' && <div className="alert alert-success">{save_success}</div> }
            </div>
            )
       };
}