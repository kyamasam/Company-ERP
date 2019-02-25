<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class project extends Model
{

    protected $fillable=['name','progress','description','customers', 'developers'];


//    public function user(){
//        return $this->belongsToMany(User::class,'projects_customers')->withPivot('user_id','project_id');
//    }

    public function user()
    {
        return $this->belongsToMany(User::class,'project_customers');
    }

    public function assigned_employee()
    {
        return $this->belongsToMany(User::class,'employee_projects','employee_id','project_id');
    }

    public function payment(){
        return $this->hasMany(payment::class);
    }


}


