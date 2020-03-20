<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    //the business that owns this expense
    public function Business(){
        return $this->belongsTo(Business::class);
    }

    public function OutgoingPayment(){
        return $this->hasOne(OutgoingPayment::class);
    }



}
