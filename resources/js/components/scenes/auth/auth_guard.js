import axios from "axios";
import React, {Component} from "react";
export default class AuthGuard extends Component {
    constructor(props){
        super(props);
        this.state={
            logged_in_user:[],
            loading:true
        }
    }

    componentDidMount(){
        axios.get('/api/v1/user')
            .then(response =>{

                console.log(response.data)
                const newState= Object.assign({},this.state,{
                    logged_in_user:response.data,
                    loading:false
                });
                this.setState(newState);
            })
            .catch(error =>{
                    if (error.response.status === 401){
                        var prev_location=(window.location.pathname);

                        localStorage.setItem('prev_location',prev_location.toString());
                        window.location.replace("/login");
                    }
                    else{
                        console.log(error.response);
                    }
                }
            );
    }

    render(){
        if(this.state.loading === true){
            return (
                <div>
                    <p>loading</p>
                </div>
            )
        }
        return(

            <div>{this.props.children}</div>
        )

    };

}