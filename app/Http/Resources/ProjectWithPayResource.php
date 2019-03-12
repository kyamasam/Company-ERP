<?php

namespace App\Http\Resources;

use App\payment;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectWithPayResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'name'=>$this->name,
            'payments'=>PaymentWithoutProjectResource::collection(payment::find($this->payment)),
        ];
    }
}
