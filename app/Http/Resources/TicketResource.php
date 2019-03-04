<?php

namespace App\Http\Resources;

use App\TicketCategory;
use App\User;
use Illuminate\Http\Resources\Json\JsonResource;

class TicketResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $asssigned_to= array($this->assigned_to);
        return [
            'user_id'=>$this->user_id,
            'title'=>$this->title,
            'description'=>$this->description,
            'category'=>new CategoryResource(TicketCategory::find($this->category)),
            'resolved'=>$this->resolved,
            'assigned_to'=> new UserLtdResource(User::find($this->assigned_to))
        ];
    }
}
