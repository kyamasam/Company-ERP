<?php

namespace App\Http\Controllers;

use App\Http\Resources\SubscriptionResource;
use App\payment;
use App\Product;
use App\Subscription;
use App\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\Resource;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use PhpParser\Node\Scalar\String_;
use PHPUnit\Util\Json;
use GuzzleHttp\Client;

use App\Http\Middleware;



class SubscriptionController extends Controller
{


        /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */




    public function index()
    {
        $subscriptions = Subscription::all()->sortByDesc('id');
//        return json_encode(Auth::user());

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



        $subscription->payment_id=$request->payment_id;
        //get the payment the user claims to have made
        $payment = payment::find($request->payment_id);
        //get the product they're subscribing to
        $product = Product::find($request->product_id);
        $total_assoc_prices=$product->price;
        //get all other products associated with it
        $associated_products= array($product->association);
//        dd($associated_products);
        foreach ($associated_products as $prod){
            $assoc_product = Product::find($prod);
            $total_assoc_prices += $assoc_product->price;
        }
        //check if they have enough money in the selected payment
        $payment_remaining = $payment->amount - $payment->amount_used;
        if ($payment_remaining >=$total_assoc_prices){
            //they have enough money
            //proceed to charge by setting the amount used to price
            $payment->amount_used = $product->price;
            $payment->save();
        }else{
            //they don't have enough money
            //retrieve all payments where the amount is not completely used.
            $deficit = $total_assoc_prices - $payment_remaining;
            return json_encode("insufficient_funds");
//            return json_encode(
//                [
//                 "error" =>  "insufficient_funds",
//                    "deficit" => $deficit,
//                    "total_assoc_prices" =>$total_assoc_prices,
//                    "payment_remaining" =>$payment_remaining,
//                    "associated_products" =>$associated_products
//                ]
//
//            );
        }
        $subscription->start_date= \Carbon\Carbon::now();
        $subscription->expiry_date= \Carbon\Carbon::now()->addDays($product->subscription_duration);


        $subscription->save();
        return json_encode('successful');

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Subscription  $subscription
     * @return SubscriptionResource
     */
    public function show(Subscription $subscription)
    {
        return new SubscriptionResource($subscription);
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
     * @return String_
     */
    public function update(Request $request, Subscription $subscription)
    {

        $validator=Validator::make($request->all(), [
            'user_id' => 'required|integer',
            'product_id' => 'required|integer',
            'payment_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return json_encode($validator->messages()->first());
        }
        $edit_subscription = $subscription;


        $edit_subscription->user_id=$request->user_id;
        $edit_subscription->product_id=$request->product_id;



        $edit_subscription->payment_id=$request->payment_id;
        //get the payment the user claims to have made
        $payment = payment::find($request->payment_id);
        //get the product they're subscribing to
        $product = Product::find($request->product_id);
        $total_assoc_prices=$product->price;
        //get all other products associated with it
        $associated_products= array($product->association);
//        dd($associated_products);
        foreach ($associated_products as $prod){
            $assoc_product = Product::find($prod);
            $total_assoc_prices += $assoc_product->price;
        }
        //check if they have enough money in the selected payment
        $payment_remaining = $payment->amount - $payment->amount_used;
        if ($payment_remaining >=$total_assoc_prices){
            //they have enough money
            //proceed to charge by setting the amount used to price
            $payment->amount_used = $payment->amount_used + $product->price;
            $payment->save();
        }else{
            //they don't have enough money
            //retrieve all payments where the amount is not completely used.
            $deficit = $total_assoc_prices - $payment_remaining;
            return json_encode(
                [
                    "error" =>  "insufficient_funds",
                    "deficit" => $deficit,
                    "total_assoc_prices" =>$total_assoc_prices,
                    "payment_remaining" =>$payment_remaining,
                    "associated_products" =>$associated_products
                ]

            );
        }
        $subscription->start_date= \Carbon\Carbon::now();
        $subscription->expiry_date= \Carbon\Carbon::parse($subscription->expiry_date)->addDays($product->subscription_duration);


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
//        $sub = Subscription::find($subscription->id);
//        $sub->delete();
//        return json_encode("delete_successful");
    }

    /**
     * Display the current users subscriptions.
     *
     * @param  Request  $request
     * @return SubscriptionResource
     */
    public function my_subscriptions(Request $request){

        $user=$request->user()->id;
        return SubscriptionResource::collection(User::find($user)->Subscription()->get());
//        return json_encode("sdsdfsd");

//       return new SubscriptionResource($user);
    }
}
