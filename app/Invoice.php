<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    //customer who owns this inv
    public function Customer()
    {
        return $this->belongsTo(Customer::class);
    }

    //business that has created this inv

    public function Business()
    {
        return $this->belongsTo(Business::class);
    }

    //products that are contained in this inv

    public function Products(){
        return $this->hasMany(Product::class);
    }

    //payments made towards this invoice
    public function PaymentsForInvoice(){
        return $this->hasManyThrough(IncomingPayment::class, 'invoice_payments');
    }

    // todo : determine whether reverse relation is required


}
