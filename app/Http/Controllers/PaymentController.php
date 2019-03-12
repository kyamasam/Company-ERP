<?php

namespace App\Http\Controllers;

use App\Http\Resources\PaymentResource;
use App\Http\Resources\ProjectWithPayResource;
use App\payment;
use App\quotation_payment;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\quotation ;

class PaymentController extends Controller
{

    function __construct()
    {
        $this->today=Carbon::now();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
//        PaymentResource::withoutWrapping();

        return PaymentResource::collection(payment::all()->sortByDesc('id'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\payment  $payment
     * @return \Illuminate\Http\Response
     */
    public function show(payment $payment)
    {
//        PaymentResource::withoutWrapping();

        return new PaymentResource($payment);

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\payment  $payment
     * @return \Illuminate\Http\Response
     */
    public function edit(payment $payment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\payment  $payment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, payment $payment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\payment  $payment
     * @return \Illuminate\Http\Response
     */
    public function destroy(payment $payment)
    {
        //
    }

    /**
     * Sum all the confirmed payments between the two provided days from today.
     *
     * @param $start_from
     * @param $end_at
     * @return \Illuminate\Http\Response
     */
    public function sum_payments_within($start_from,$end_at = null)
    {
        if( isset($end_at)){
            $start_from = Carbon::now()->subDays($start_from);
            $end_at = Carbon::now()->subDays($end_at);
        }else{
            $start_from = Carbon::now()->subDays($start_from);
            $end_at = Carbon::now();
        }

        //when the two dates are equal, then it means we want to get payments made today, this will
        //mean that we should only consider the date updated at being greater than start from , that will wi do the trick
        if($start_from->eq($end_at)){
            $payments= payment::where('confirmed','=','1')->where('updated_at','>=',$start_from)->sum('amount');
            return json_encode($payments);
        }
        else{
            $payments= payment::where('confirmed','=','1')->where('updated_at','>=',$start_from)->where('updated_at','<=',$end_at)->sum('amount');
            return json_encode($payments);
        }
//        return json_encode($payments);
    }

    /**
     * Count all the confirmed payments between the two provided days from today.
     *
     * @param $start_from
     * @param $end_at
     * @return \Illuminate\Http\Response
     */
    public function count_payments_within($start_from,$end_at = null)
    {
        if( isset($end_at)){
            $start_from = Carbon::today()->subDays($start_from);
            $end_at = Carbon::today()->subDays($end_at);
        }else{
            $start_from = Carbon::today()->subDays($start_from);
            $end_at = Carbon::today();
        }

        if($start_from->eq($end_at)){
            $payments= payment::where('confirmed','=','1')->where('updated_at','>=',$start_from)->count();
            return json_encode($payments);
        }
        else{
            $payments= payment::where('confirmed','=','1')->where('updated_at','>=',$start_from)->where('updated_at','<=',$end_at)->count();
            return json_encode($payments);
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\quotation  $invoice_id
     * @return \Illuminate\Http\Response
     */
    public function payment_for_invoice($invoice_id)
    {
//        PaymentResource::withoutWrapping();
//        return App\
        return PaymentResource::collection(payment::where('invoice_id','=',$invoice_id)->get());
//        return 'adsads';
    }
    /**
     * Return Payments for user
     *
     * @param  \App\User  $user_id
     * @return
     */
    public function user_payments($user_id)
    {


        $user_projects = User::find($user_id)->project()->get();
//        return $user_projects;

        return ProjectWithPayResource::collection($user_projects);

    }
}

