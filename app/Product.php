<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{

    protected $fillable =['name','price' ,'association', 'subscription_duration'];
    public function category()
    {
        return $this->belongsToMany(Category::class,'product_categories');
    }
    public function quotation()
    {
        return $this->belongsToMany(quotation::class,'quotation_products');
    }
    public function subscription()
    {
        return $this->hasMany(Subscription::class);
    }

    //new

    public function Invoices(){
        return $this->belongsToMany(Invoice::class, 'invoice_products');
    }


}
