<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class payment extends Model
{
    public function quotation()
    {
        return $this->belongsToMany(quotation::class,'quotation_payments');
    }
    public function project()
    {
        return $this->belongsTo(project::class, 'project_id');
    }
    public function subscription()
    {
        return $this->hasMany(Subscription::class, 'payment_id');
    }
}
