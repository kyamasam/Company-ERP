<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RecurringInvoice extends Model
{
    //customer whom this belongs to
    public function Customer(){
        return $this->belongsTo(Customer::class);
    }

    //business that owns this inv

    public function Business(){
        return $this->belongsTo(Business::class);
    }
}
