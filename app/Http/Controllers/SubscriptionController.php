<?php

namespace App\Http\Controllers;

use App\Http\Resources\SubscriptionResource;
use App\Subscription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SubscriptionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $subscriptions = Subscription::all();

        return SubscriptionResource::collection($subscriptions);
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
        $validator=Validator::make($request->all(), [
            'user_id' => 'required|integer',
            'product_id' => 'required|integer',
            'payment_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return json_encode($validator->messages()->first());
        }
        $subscription = new Subscription;


        $subscription->user_id=$request->user_id;
        $subscription->product_id=$request->product_id;

        $subscription->start_date= \Carbon\Carbon::now();
        $subscription->expiry_date= \Carbon\Carbon::now();
        $subscription->payment_id=$request->payment_id;
        $subscription->save();
        return json_encode('successful');

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Subscription  $subscription
     * @return \Illuminate\Http\Response
     */
    public function show(Subscription $subscription)
    {
        $subscription = Subscription::find($subscription);
        return SubscriptionResource::collection($subscription);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Subscription  $subscription
     * @return \Illuminate\Http\Response
     */
    public function edit(Subscription $subscription)
    {


    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Subscription  $subscription
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Subscription $subscription)
    {
        $validator=Validator::make($request->all(), [
            'user_id' => 'required|integer',
            'product_id' => 'required|integer',
            'start_date' => 'required|date_format:YYYY-MM-DD H:m:s',
            'expiry_date' => 'required',
            'payment_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return json_encode($validator->messages()->first());
        }
        $subscription =  Subscription::find($request->id);


        $subscription->User()->detatch($request->user_id);
        $subscription->Product()->detatch($request->product_id);

        $subscription->start_date= $request->start_date;
        $subscription->expiry_date= $request->expiry_date;
        $subscription->Payment()->attach($request->payment_id);
        $subscription->save();
        return json_encode('edit_successful');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Subscription  $subscription
     * @return \Illuminate\Http\Response
     */
    public function destroy(Subscription $subscription)
    {
        $sub = Subscription::find($subscription->id);
        $sub->delete();
        return json_encode("delete_successful");
    }
}
