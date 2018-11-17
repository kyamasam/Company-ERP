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
        ];
    }
}
