<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Business extends Model
{
    public function Owner()
    {
        return $this->belongsTo(User::class,'business_owner_id');
    }
    public function Category(){
        return $this->belongsTo(BusinessCategory::class, 'business_category_id');
    }

    //customers who belong to this business

    public function Customers(){
        return $this->hasMany(Customer::class, 'business_id');
    }

    //account that the business has

    public function Accounts(){
        return $this->hasMany(Account::class, 'business_id');
    }

    // expenses that belong to this business
    public function Expenses(){
        return $this->hasMany(Expense::class, 'business_id');
    }

    //outgoing payments that belong to this business
    public function OutgoingPayments(){
        return $this->hasMany(OutgoingPayment::class);
    }

    // incoming payments that this business owns

    public function IncomingPayments(){
        return $this->hasMany(IncomingPayment::class);
    }

    //employees that belong to this business

    public function Employees(){
        return $this->hasMany(Employee::class, 'business_id');
    }


    //salary payments that have been made by the business

    public function SalaryPayments(){
        return $this->hasMany(EmployeeSalaryPayment::class, 'business_id');
    }

    //todo create users who have rights to access this business

    //invoices that have been created by this business

    public function Invoices(){
        return $this->hasMany(Invoice::class, 'business_id');
    }
     //recurring invoices that have been created by this business

    public function RecurringInvoices(){
        return $this->hasMany(RecurringInvoice::class, 'business_id');
    }





}
