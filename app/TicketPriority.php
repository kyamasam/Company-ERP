<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TicketPriority extends Model
{
    protected $fillable =['name','description'];
    public function Category(){
        return $this->hasMany(TicketCategory::class, 'priority');
    }

    //get all tickets with certain priority
    public function Ticket(){
        $category = TicketPriority::find($this->id)->Category()->get();
        $tickets = $category[0]->Ticket()->get();

        return $tickets;
    }

}
