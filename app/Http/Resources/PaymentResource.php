<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PaymentResource extends JsonResource
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
        return[
            'id'=>$this->id,
            'project'=> new ProjectsResource($this->project),
            'invoice_id'=>$this->invoice_id,
            'amount'=>$this->amount,
            'created_at'=>$this->created_at->format('m/d/Y'),
            'updated_at'=>$this->updated_at->format('m/d/Y'),
            'payment_method'=>$this->payment_method,
            'amount_used'=>$this->amount_used,
            'currency'=>$this->currency,
            'confirmed'=>$this->confirmed,
        ];
    }
}
