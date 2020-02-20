<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class proficiency extends Model
{
    public function user()
    {
        return $this->belongsToMany(User::class,'user_proficiencies');
    }
}
