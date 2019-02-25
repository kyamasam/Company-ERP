import {Component} from "react";
import React from "react";
import Footer from "../../layouts/footer"
import Breadcrumbs from "../../layouts/breadcrumbs_2l"

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
        }
    }
    componentDidMount(){
        axios.all([
            axios.get("http://127.0.0.1:8000/api/v1/payments/sum_payments_within/7/0"),
            axios.get("http://127.0.0.1:8000/api/v1/payments/sum_payments_within/8/1"),
            axios.get("http://127.0.0.1:8000/api/v1/users/"),
            axios.get("http://127.0.0.1:8000/api/v1/projects/count/2"),
            axios.get("http://127.0.0.1:8000/api/v1/payments/count_payments_within/0/0"),
            axios.get("http://127.0.0.1:8000/api/v1/payments/count_payments_within/1/0"),
        ])
            .then(
                axios.spread((current_revenue_Res,prev_revenue_Res,users_Res,projects_Res,payments_count_Res,payments_count_yesterday_Res) =>{

                this.setState({
                    current_revenue:current_revenue_Res.data,
                    prev_revenue:prev_revenue_Res.data,
                    users_count:users_Res.data.meta.total,
                    projects_count:projects_Res.data,
                    payments_count:payments_count_Res.data,
                    payments_count_yesterday:payments_count_yesterday_Res.data,

                })
                console.log("curr revenue is"+ this.state.current_revenue)
                console.log("prev revenue is"+ this.state.prev_revenue)
                console.log("user count is"+ this.state.users_count)
                console.log("project count is"+ this.state.projects_count)
                console.log("payment count is"+ this.state.payments_count)
                console.log("payment count yesterday was"+ this.state.payments_count_yesterday)


            }))
            .catch(error =>{
                console.log(error.response);
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

                                    <h2 className="m-0 text-dark counter font-600">Ksh { this.state.current_revenue.toLocaleString() }</h2>
                                    <div className=" m-t-15"> Revenue last 7 days <span className="pull-right" style={{marginRight:"6"+"%"}}>Ksh {difference.toLocaleString()}</span> </div>

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


                        <div className="row">

                            <div className="col-12">

                                <div className="portlet">
                                    <div className="portlet-heading">
                                        <h3 className="portlet-title text-dark text-uppercase">
                                            Payments
                                        </h3>
                                        <div className="portlet-widgets">
                                            <a href="javascript:;" data-toggle="reload"><i className="ion-refresh"/></a>
                                            <span className="divider"/>
                                            <a data-toggle="collapse" data-parent="#accordion1" href="#portlet2"><i
                                                className="ion-minus-round"/></a>
                                            <span className="divider"/>
                                            <a href="#" data-toggle="remove"><i className="ion-close-round"/></a>
                                        </div>
                                        <div className="clearfix"/>
                                    </div>
                                    <div id="portlet2" className="panel-collapse collapse show">
                                        <div className="portlet-body">
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Project Name</th>
                                                        <th>Start Date</th>
                                                        <th>Due Date</th>
                                                        <th>Status</th>
                                                        <th>Assign</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>Ubold Admin v1</td>
                                                        <td>01/01/2015</td>
                                                        <td>26/04/2015</td>
                                                        <td><span className="label label-info">Released</span></td>
                                                        <td>Coderthemes</td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>Ubold Frontend v1</td>
                                                        <td>01/01/2015</td>
                                                        <td>26/04/2015</td>
                                                        <td><span className="label label-success">Released</span></td>
                                                        <td>Coderthemes</td>
                                                    </tr>
                                                    <tr>
                                                        <td>3</td>
                                                        <td>Ubold Admin v1.1</td>
                                                        <td>01/05/2015</td>
                                                        <td>10/05/2015</td>
                                                        <td><span className="label label-pink">Pending</span></td>
                                                        <td>Coderthemes</td>
                                                    </tr>
                                                    <tr>
                                                        <td>4</td>
                                                        <td>Ubold Frontend v1.1</td>
                                                        <td>01/01/2015</td>
                                                        <td>31/05/2015</td>
                                                        <td><span className="label label-purple">Work in Progress</span>
                                                        </td>
                                                        <td>Coderthemes</td>
                                                    </tr>
                                                    <tr>
                                                        <td>5</td>
                                                        <td>Ubold Admin v1.3</td>
                                                        <td>01/01/2015</td>
                                                        <td>31/05/2015</td>
                                                        <td><span className="label label-warning">Coming soon</span>
                                                        </td>
                                                        <td>Coderthemes</td>
                                                    </tr>

                                                    <tr>
                                                        <td>6</td>
                                                        <td>Ubold Admin v1.3</td>
                                                        <td>01/01/2015</td>
                                                        <td>31/05/2015</td>
                                                        <td><span className="label label-primary">Coming soon</span>
                                                        </td>
                                                        <td>Coderthemes</td>
                                                    </tr>

                                                    <tr>
                                                        <td>7</td>
                                                        <td>Ubold Admin v1.3</td>
                                                        <td>01/01/2015</td>
                                                        <td>31/05/2015</td>
                                                        <td><span className="label label-info">Cool</span></td>
                                                        <td>Coderthemes</td>
                                                    </tr>

                                                    <tr>
                                                        <td>8</td>
                                                        <td>Ubold Admin v1.3</td>
                                                        <td>01/01/2015</td>
                                                        <td>31/05/2015</td>
                                                        <td><span className="label label-warning">Coming soon</span>
                                                        </td>
                                                        <td>Coderthemes</td>
                                                    </tr>

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}