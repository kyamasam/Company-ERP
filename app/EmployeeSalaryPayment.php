<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EmployeeSalaryPayment extends Model
{

    // business that owns this salary payment
    public function Business(){
        return $this->belongsTo(Business::class);
    }

    //the employee who was paid

    public function Employee(){
        return $this->belongsTo(Employee::class);
    }

    //outgoing payment associated with this Salary Payment Record
    public function OutgoingPayment(){
        return $this->hasOne(OutgoingPayment::class);
    }
}
