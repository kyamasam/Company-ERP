<?php

namespace App\Http\Resources;

use App\product;
use App\User;
use Illuminate\Http\Resources\Json\JsonResource;

class SubscriptionResource extends JsonResource
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
            'user'=> new UserLtdResource(User::find($this->user_id)),
            'product'=> new ProductResource(product::find($this->product_id)),
            'start_date'=> $this->start_date,
            'expiry_date'=> $this->expiry_date,
            'payment'=> $this->payment_id,
        ];
    }
}
