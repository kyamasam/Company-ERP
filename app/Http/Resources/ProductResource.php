<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
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
            'id'=>$this->id,
            'name'=>$this->name,
            'price'=>$this->price,
            'association'=>$this->association,
            'subscription_duration'=>$this->subscription_duration,
            'category'=>CategoryResource::collection($this->category)
        ];
    }
}
