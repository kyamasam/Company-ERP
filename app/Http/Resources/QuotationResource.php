<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class QuotationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
//        return parent::toArray($request);
        return [
          'id'=>$this->id,
          'customer'=> new UserResource($this->user),
          'products'=> ProductResource::collection($this->products),
          'accepted'=> $this->accepted,
            'created_at'=>$this->created_at->format('m/d/Y'),
//          'payments'=> PaymentResource::collection($this->payments)
        ];
    }
}
