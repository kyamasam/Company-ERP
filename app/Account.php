<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    //business that owns this account
    function Business(){
        return $this->belongsTo(Business::class);
    }
}
