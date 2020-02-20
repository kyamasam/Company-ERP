<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TicketCategory extends Model
{
    protected $fillable =['category_name','priority'];

    public function Ticket(){
        return $this->hasMany(Ticket::class,'category');
    }
    public function Priority(){
        return $this->belongsTo(TicketPriority::class,'priority');
    }
}
