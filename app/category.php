<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class category extends Model
{

    public function product()
    {
        return $this->belongsToMany(product::class,'product_categories');
    }
}
