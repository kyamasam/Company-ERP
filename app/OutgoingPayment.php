<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OutgoingPayment extends Model
{
    public function Expense(){
        return $this->belongsTo(Expense::class, 'outgoing_payment_id');
    }

    // the business that owns this outgoing payment
    public function Business(){
        return $this->belongsTo(Business::class, 'business_id');
    }

    // get the record of the SalaryPayment that is associated with this Payment
    public function SalaryPayment(){
        return $this->hasMany(EmployeeSalaryPayment::class, 'outgoing_payment_id');
    }

}
