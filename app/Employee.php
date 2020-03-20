<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    //business that the employee is attached to
    public function Business(){
        return $this->belongsTo(Business::class);
    }

    // statutory benefits that this employee is entitled to

    public function Statutory(){
        return $this->hasMany(Statutory::class, 'employee_id');
    }

    // salary payments attached to this employee
    public function SalaryPayments(){
        return $this->hasMany(EmployeeSalaryPayment::class, 'employee_id');
    }
}
