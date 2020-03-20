<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BusinessCategory extends Model
{
    public function Business(){
        return $this->hasMany(Business::class);
    }
}
