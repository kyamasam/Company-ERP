<?php

namespace App\Http\Controllers;

use App\Http\Resources\PaymentResource;
use App\payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //here , we want to group all the payments that were made towards a specific invoice
//        $all_payments= PaymentResource::collection(payment::paginate())->groupBy('invoice_id');
//        return $all_payments;
//        $changed= $all_payments->map(function ($item, $key ) {
//                return[
//                    $item['created_at'] = $item->created_at,
////                    'amount'=>$row->sum('amount')
//                ];
//
//            });
//        return $changed->all();

        $payment= payment::
        selectRaw('sum(amount) as amount, invoice_id , max(project_id) as project_id, max(created_at) as created_at ')
        ->groupBy('invoice_id')
        ->get();

        return $payment;



//        return PaymentResource::collection(payment::paginate())->groupBy('invoice_id')->selectRaw('sum(amount) as amounts, invoice_id','id');


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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return PaymentResource::collection(payment::where('invoice_id',$id)->get());
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
