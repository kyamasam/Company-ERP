<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class product extends Model
{

    protected $fillable =['name','price' ,'association', 'subscription_duration'];
    public function category()
    {
        return $this->belongsToMany(category::class,'product_categories');
    }
    public function quotation()
    {
        return $this->belongsToMany(quotation::class,'quotation_products');
    }
    public function subscription()
    {
        return $this->hasMany(Subscription::class);
    }


}
