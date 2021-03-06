<?php

namespace App\Http\Resources;

use App\User;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectsResource extends JsonResource
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
            'description'=>$this->description,
            'progress'=>$this->progress,
            'created_at'=>$this->created_at,
            'customers' => UserResource::collection($this->user),
            'assigned_to' => UserResource::collection($this->assigned_employee),
        ];
    }

}
