<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class IncomingPayment extends Model
{
    // the business that owns this outgoing payments

    public function Business(){
        return $this->belongsTo(Business::class, 'business_id');
    }

}
