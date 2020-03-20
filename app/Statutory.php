<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Statutory extends Model
{
    public function Employee(){
        return $this->belongsToMany(Employee::class, 'employee_statutories','statutory_id','employee_id');
    }
}
