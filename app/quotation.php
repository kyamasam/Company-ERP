<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class quotation extends Model
{
    public function user(){
        return $this->belongsTo(User::class,'client_id','id');
    }
    public function products()
    {
        return $this->belongsToMany(product::class,'quotation_products');
    }

    public function payments()
    {
        return $this->belongsToMany(payment::class,'quotation_payments');
    }
}
