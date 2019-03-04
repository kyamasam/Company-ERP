<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Ticket extends Model
{
    use SoftDeletes;
    protected $fillable =[ 'user_id','title','category','description','priority','resolved','assigned_to'];

    public function User(){
        return $this->belongsTo(User::class,'user_id');
    }
    public function AssignedUser(){
        return $this->belongsTo(User::class,'assigned_to');
    }
    public function Category(){
        return $this->belongsTo(TicketCategory::class,'category');
    }
    public function Priority(){
        $ticket = Ticket::find($this->id);
        $category= $ticket->Category()->get();
        $priority =$category[0]->Priority()->get();

        return $priority;
    }
}
