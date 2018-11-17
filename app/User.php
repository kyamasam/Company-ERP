<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function project()
    {
        return $this->belongsToMany(project::class,'project_customers');
    }

    public function assigned_project()
    {
        return $this->belongsToMany(project::class,'employee_projects','employee_id','project_id');
    }

    public function proficiency()
    {
        return $this->belongsToMany(proficiency::class,'user_proficiencies');
    }


    public function user_type()
    {
        return $this->belongsTo(user_type::class, 'type');
    }
    public function quotation()
    {
        return $this->hasMany(quotation::class,'client_id');
    }


}
