<?php

namespace App\Http\Controllers;

use App\Http\Resources\QuotationResource;
use App\quotation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class QuotationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
//        QuotationResource::withoutWrapping();
        return QuotationResource::collection(quotation::all()->sortByDesc('id'));

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
     * Approve a quotation.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function approve(Request $request)
    {

        DB::table('quotations')->where('id','=',$request->quotation_id)->update(['accepted'=>1]);
        return json_encode("successful");
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\quotation  $quotation
     * @return \Illuminate\Http\Response
     */
    public function show(quotation $quotation)
    {
//        QuotationResource::withoutWrapping();
        $user= quotation::findOrFail($quotation->id);
//        return $user;
        return new QuotationResource($user);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\quotation  $quotation
     * @return \Illuminate\Http\Response
     */
    public function edit(quotation $quotation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\quotation  $quotation
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, quotation $quotation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\quotation  $quotation
     * @return \Illuminate\Http\Response
     */
    public function destroy(quotation $quotation)
    {
        //
    }
}
