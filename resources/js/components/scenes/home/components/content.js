import {Component} from "react";
import React from "react";
import Footer from "../../layouts/footer"
import Breadcrumbs from "../../layouts/breadcrumbs_2l"
import Payment from "./payments_table";



export default class Content extends Component {
    constructor(props){
        super(props);
        this.state ={
            current_revenue:0,
            prev_revenue:0,
            users_count:[],
            projects_count:[],
            payments_count:[],
            payments_count_yesterday:[],
            isLoading:true
        }
    }
    componentDidMount(){
        axios.all([
            axios.get("/api/v1/payments/sum_payments_within/7/0"),
            axios.get("/api/v1/payments/sum_payments_within/8/1"),
            axios.get("/api/v1/users/"),
            axios.get("/api/v1/projects/count/2"),
            axios.get("/api/v1/payments/count_payments_within/0/0"),
            axios.get("/api/v1/payments/count_payments_within/1/0"),
        ])
            .then(
                axios.spread((current_revenue_Res,prev_revenue_Res,users_Res,projects_Res,payments_count_Res,payments_count_yesterday_Res) =>{

                this.setState({
                    current_revenue:current_revenue_Res.data,
                    prev_revenue:prev_revenue_Res.data,
                    users_count:users_Res.data.data.length,
                    projects_count:projects_Res.data,
                    payments_count:payments_count_Res.data,
                    payments_count_yesterday:payments_count_yesterday_Res.data,
                    isLoading:false

                })
                console.log("curr revenue is"+ this.state.current_revenue)
                console.log("prev revenue is"+ this.state.prev_revenue)
                console.log("user count is"+ this.state.users_count)
                console.log("project count is"+ this.state.projects_count)
                console.log("payment count is"+ this.state.payments_count)
                console.log("payment count yesterday was"+ this.state.payments_count_yesterday)


            }))
            .catch(error =>{
                console.log(error);
                }
            );
    }
    componentWillMount(){
    }

    render() {

         const difference= this.state.current_revenue-this.state.prev_revenue;
         var arrow_trend = "";
         var trend_color = "";

         if(this.state.current_revenue > this.state.prev_revenue){
             arrow_trend ="up"
             trend_color ="primary"
         }
         else if(this.state.current_revenue < this.state.prev_revenue){
             arrow_trend = "down"
             trend_color = "danger"
         }
         else{
             arrow_trend = "neutral"
             trend_color = "inverse"
         }

        var carret_trend = "";
        var carret_color = "";
        if(this.state.payments_count > this.state.payments_count_yesterday){
            carret_trend ="up"
            carret_color ="primary"
        }
        else if(this.state.payments_count < this.state.payments_count_yesterday){
            carret_trend = "down"
            carret_color = "danger"
        }
        else{
            carret_trend = "neutral"
            carret_color = "inverse"
        }




        return (
            <div className="content-page">
                <div className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="btn-group pull-right m-t-15">
                                    <button type="button"
                                            className="btn btn-default dropdown-toggle waves-effect waves-light"
                                            data-toggle="dropdown" aria-expanded="false">Settings
                                    </button>
                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="btnGroupDrop1">
                                        <a className="dropdown-item" href="#">Dropdown One</a>
                                        <a className="dropdown-item" href="#">Dropdown Two</a>
                                        <a className="dropdown-item" href="#">Dropdown Three</a>
                                        <a className="dropdown-item" href="#">Dropdown Four</a>
                                    </div>
                                </div>
                                <Breadcrumbs{...this.props}/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 col-lg-6 col-xl-3">
                                <div className="widget-panel widget-style-2 bg-white">



                                        <i className={"md md-trending-"+arrow_trend+" "+ "text-"+trend_color }></i>

                                    {!this.state.isLoading ?
                                    <h2 className="m-0 text-dark counter font-600"> { this.state.current_revenue.toLocaleString() }</h2>
                                        : <i className="fa fa-spin fa-spinner"></i>}
                                    <div className=" m-t-15"> Revenue (KSH) <br/> last 7 days
                                        {/*<span className="pull-right" style={{marginRight:"6"+"%"}}>Ksh {difference.toLocaleString()}</span> */}
                                    </div>

                                </div>
                            </div>
                            <div className="col-md-6 col-lg 6 col-xl-3">
                                <div className="widget-panel widget-style-2 bg-white">
                                    <i className="md md-work text-primary"></i>
                                    <h2 className="m-0 text-dark counter font-600">{this.state.projects_count}</h2>
                                    <div className="text-muted m-t-5">Projects Ongoin</div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-6 col-xl-3">
                                <div className="widget-panel widget-style-2 bg-white">
                                    <i className="md  md-attach-money text-info"></i>
                                    <h2 className="m-0 text-dark counter font-600">{this.state.payments_count}</h2>
                                    <div className="text-muted m-t-5">Payments In
                                        <i className={"fa fa-caret-" + carret_trend +" text-"+carret_color+" status_icon"}></i>
                                    </div>

                                </div>
                            </div>
                            <div className="col-md-6 col-lg-6 col-xl-3">
                                <div className="widget-panel widget-style-2 bg-white">
                                    <i className="md md-account-child text-custom"></i>
                                    <h2 className="m-0 text-dark counter font-600">
                                        {
                                            this.state.users_count
                                        }
                                    </h2>
                                    <div className="text-muted m-t-5">Users</div>
                                </div>
                            </div>
                        </div>

                        <Payment{...this.props} />



                        {/*// <div className="row">*/}
                        {/*//*/}
                            {/*/!*<div className="col-lg-12 col-xl-4">*!/*/}
                                {/*/!*<div className="card-box">*!/*/}
                                    {/*/!*<h4 className="text-dark header-title m-t-0 m-b-30">Daily Sales</h4>*!/*/}

                                    {/*/!*<div className="widget-chart text-center">*!/*/}
                                        {/*/!*<div id="sparkline3"/>*!/*/}
                                        {/*/!*<ul className="list-inline m-t-15">*!/*/}
                                            {/*/!*<li>*!/*/}
                                                {/*/!*<h5 className="text-muted m-t-20">Target</h5>*!/*/}
                                                {/*/!*<h4 className="m-b-0">$1000</h4>*!/*/}
                                            {/*/!*</li>*!/*/}
                                            {/*/!*<li>*!/*/}
                        {/*//                         <h5 className="text-muted m-t-20">Last week</h5>*/}
                        {/*//                         <h4 className="m-b-0">$523</h4>*/}
                        {/*//                     </li>*/}
                                            {/*/!*<li>*!/*/}
                                                {/*/!*<h5 className="text-muted m-t-20">Last Month</h5>*!/*/}
                                                {/*/!*<h4 className="m-b-0">$965</h4>*!/*/}
                                            {/*/!*</li>*!/*/}
                                        {/*/!*</ul>*!/*/}
                                    {/*/!*</div>*!/*/}
                                {/*/!*</div>*!/*/}

                            {/*/!*</div>*!/*/}

                            {/*/!*<div className="col-lg-12 col-xl-4">*!/*/}
                                {/*/!*<div className="card-box">*!/*/}
                                    {/*/!*<h4 className="text-dark  header-title m-t-0 m-b-30">Weekly Sales</h4>*!/*/}

                                    {/*/!*<div className="widget-chart text-center">*!/*/}
                                        {/*/!*<div id="sparkline2"/>*!/*/}
                                        {/*/!*<ul className="list-inline m-t-15">*!/*/}
                                            {/*/!*<li>*!/*/}
                                                {/*/!*<h5 className="text-muted m-t-20">Target</h5>*!/*/}
                                                {/*/!*<h4 className="m-b-0">$1000</h4>*!/*/}
                                            {/*/!*</li>*!/*/}
                                            {/*/!*<li>*!/*/}
                        {/*//                         <h5 className="text-muted m-t-20">Last week</h5>*/}
                        {/*//                         <h4 className="m-b-0">$523</h4>*/}
                        {/*//                     </li>*/}
                        {/*//                     <li>*/}
                                                {/*/!*<h5 className="text-muted m-t-20">Last Month</h5>*!/*/}
                                                {/*/!*<h4 className="m-b-0">$965</h4>*!/*/}
                                            {/*/!*</li>*!/*/}
                                        {/*/!*</ul>*!/*/}
                                    {/*/!*</div>*!/*/}
                                {/*/!*</div>*!/*/}

                        {/*//     </div>*/}
                        {/*//*/}
                            {/*/!*<div className="col-lg-12 col-xl-4">*!/*/}
                                {/*/!*<div className="card-box">*!/*/}
                                    {/*/!*<h4 className="text-dark  header-title m-t-0 m-b-30">Monthly Sales</h4>*!/*/}

                        {/*//             <div className="widget-chart text-center">*/}
                                        {/*/!*<div id="sparkline1"/>*!/*/}
                                        {/*/!*<ul className="list-inline m-t-15">*!/*/}
                                            {/*/!*<li>*!/*/}
                                                {/*/!*<h5 className="text-muted m-t-20">Target</h5>*!/*/}
                                                {/*/!*<h4 className="m-b-0">$1000</h4>*!/*/}
                                            {/*/!*</li>*!/*/}
                                            {/*/!*<li>*!/*/}
                                                {/*/!*<h5 className="text-muted m-t-20">Last week</h5>*!/*/}
                        {/*//                         <h4 className="m-b-0">$523</h4>*/}
                        {/*//                     </li>*/}
                        {/*//                     <li>*/}
                                                {/*/!*<h5 className="text-muted m-t-20">Last Month</h5>*!/*/}
                                                {/*/!*<h4 className="m-b-0">$965</h4>*!/*/}
                                            {/*/!*</li>*!/*/}
                                        {/*/!*</ul>*!/*/}
                                    {/*/!*</div>*!/*/}
                                {/*/!*</div>*!/*/}

                            {/*/!*</div>*!/*/}


                        {/*/!*</div>*!/*/}


                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}