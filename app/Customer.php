<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    //business where the customer belongs

    public function Business(){
        return $this->belongsTo(Business::class);
    }


    //invoice attached to this customer

    public function Invoices(){
        return $this->hasMany(Invoice::class, 'customer_id');
    }

    //recurring invoices that belong to this customer

    public function RecurringInvoices(){
        return $this->hasMany(RecurringInvoice::class, 'customer_id');
    }
}
