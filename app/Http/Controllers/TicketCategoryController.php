<?php

namespace App\Http\Controllers;

use App\Http\Resources\TicketCategoryResource;
use App\TicketCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TicketCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $ticket_category = TicketCategory::all();
        return TicketCategoryResource::collection($ticket_category);
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
        $validator= Validator::make($request->all(),[
            'category_name'=>'required|string',
            'priority '=>'required|intger'
        ]);

        if ($validator->fails()){
            return json_encode($validator->errors()->first());
        }

        $ticket_category = new TicketCategory;

        $ticket_category->category_name = $request->category_name;
        $ticket_category->Priority()->attach($request->priority);

        return json_encode('successful');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\TicketCategory  $ticketCategory
     * @return \Illuminate\Http\Response
     */
    public function show(TicketCategory $ticketCategory)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\TicketCategory  $ticketCategory
     * @return \Illuminate\Http\Response
     */
    public function edit(TicketCategory $ticketCategory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\TicketCategory  $ticketCategory
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, TicketCategory $ticketCategory)
    {
        $validator= Validator::make($request->all(),[
            'category_name'=>'required|string',
            'priority '=>'required|intger'
        ]);

        if ($validator->fails()){
            return json_encode($validator->errors()->first());
        }

        $ticket_category = TicketCategory::find($request->id);

        $ticket_category->category_name = $request->category_name;
        $ticket_category->Priority()->attach($request->priority);

        return json_encode('edit_successful');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\TicketCategory  $ticketCategory
     * @return \Illuminate\Http\Response
     */
    public function destroy(TicketCategory $ticketCategory)
    {

        $ticket_category = TicketCategory::find($ticketCategory->id);

        $ticket_category->Priority()->dettach($ticketCategory->priority);

        $ticket_category->destroy();
        return json_encode('delete_successful');
    }

    /**
     * Search for a ticket_categories
     *
     * @param  int  $search_term
     * @return string
     */
    public function search($search_term='')
    {
        $result= TicketCategoryResource::collection(
            TicketCategory::where('category_name', 'LIKE', "%{$search_term}%")
                ->get());
        return $result;
    }

}
