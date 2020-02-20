<?php

namespace App\Http\Controllers;

use App\Http\Resources\TicketResource;
use App\Ticket;
use App\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use PHPUnit\Util\Json;

class TicketController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tickets =Ticket::all()->sortByDesc('id');
//        dd($tickets);
        return TicketResource::collection($tickets);
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

        $validator = Validator::make($request->all(),[
            'user_id'=>'required|integer',
            'title'=>'required|string',
            'category'=>'required|integer',
            'description'=>'required',
            'resolved'=>'nullable|integer',
        ]);





        if($validator->fails()){
            return json_encode($validator->errors()->first());
        }

        $ticket = new Ticket;


        $ticket->user_id = $request->user_id;

        $ticket->title = $request->title;
        $ticket->category=$request->category;
        $ticket->description = $request->description;
        if(!isset($request->resolved)){
            $ticket->resolved = 0;
        }
        else{
            $ticket->resolved = $request->resolved;
        }

        if(!isset($request->assigned_to)){
            //assign to someone who has few tickets
            //get a list of all employees
            $all_employees = User::all()->where('is_employee','=',1);
            $non_resolved_tickets=array();
            $employee_ids=array();

            //loop through all of them
            foreach ($all_employees as $employee){
                array_push($non_resolved_tickets,$employee->NonResolvedTickets()->count());
                array_push($employee_ids,$employee->id);

            }

            //organize keys by employee id
            $all_employees =$all_employees->keyBy('id');

            $lowest_tickets_index =array_keys($non_resolved_tickets , min($non_resolved_tickets ))[0];

            //get the id of employee with lowest tickets
            $lowest_tickets_employee_id= $employee_ids[$lowest_tickets_index];
            //now we can assign that id
            $ticket->assigned_to=$lowest_tickets_employee_id;

        }
        else{
            $ticket->assigned_to=$request->assigned_to;
        }
        $ticket->save();
        return json_encode('successful');

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Ticket  $tickets
     * @return \Illuminate\Http\Resources\Json\Resource
     */
    public function show($tickets)
    {
        $ticket=Ticket::find($tickets);

        return new TicketResource($ticket);


    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Ticket  $tickets
     * @return \Illuminate\Http\Response
     */
    public function edit(Ticket $tickets)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Ticket  $ticket
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,Ticket $ticket)
    {

//        dd(Ticket::find(Ticket::find($ticket->id)));
//        dd($ticket);
        $validator = Validator::make($request->all(),[
            'user_id'=>'required|integer',
            'title'=>'required|string',
            'category'=>'required|integer',
            'description'=>'required',
            'resolved'=>'nullable|boolean',
            'assigned_to'=>'nullable|integer',
        ]);

        if($validator->fails()){
            return json_encode($validator->errors()->first());
        }


        $ticket_update = $ticket;


        $ticket_update->user_id = $request->user_id;

        $ticket_update->title = $request->title;
        $ticket_update->category=$request->category;
        $ticket_update->description = $request->description;
        if(!isset($request->resolved)){
            $ticket_update->resolved = 0;
        }
        else{
            $ticket_update->resolved = $request->resolved;
        }
        if(!isset($request->assigned_to)){
        }
        else{
            $ticket_update->assigned_to=$request->assigned_to;
        }
        $ticket_update->save();
        return json_encode('update_successful');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Ticket  $tickets
     * @return \Illuminate\Http\Response
     */
    public function destroy($tickets)
    {

//        Ticket::find($tickets));
        $ticket = Ticket::find($tickets);
//        dd($ticket);

        $ticket->delete();
        return json_encode("delete_successful");

    }

    /**
     * Resolve a ticket.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return
     */
    public function resolve(Request $request)
    {

        DB::table('tickets')->where('id','=',$request->ticket_id)->update(['resolved'=>1]);
        return json_encode("successful");
    }
    /**
     * Resolve a ticket.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return
     */
    public function reopen(Request $request)
    {

        DB::table('tickets')->where('id','=',$request->ticket_id)->update(['resolved'=>0]);
        return json_encode("successful");
    }
}
