<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class user_type extends Model
{

    public function user(){
        return $this->hasMany(User::class, 'type');
    }



}
