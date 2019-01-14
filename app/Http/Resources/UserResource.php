<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'name'=>$this->name,
            'email'=>$this->email,
            'username'=>$this->username,
            'user_avatar'=>$this->user_avatar,
            'type'=>new UserTypeResource($this->user_type),
            'proficiency'=>new UserTypeResource($this->proficiency),
            'projects'=>EmployeeProjectResource::collection($this->assigned_project),
    ];
    }
}
