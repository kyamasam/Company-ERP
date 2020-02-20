<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
//    protected $fillable =['product_id','user_id', 'start_date', 'expiry_date', 'payment_id'];
    protected $guarded=['start_date','expiry_date'];
    public function Product(){
        return $this->belongsTo(product::class , 'product_id');
    }
    public function Payment(){
        return $this->belongsTo(payment::class,'payment_id');
    }
    public function User(){
        return $this->belongsTo(User::class,'user_id');
    }




}
