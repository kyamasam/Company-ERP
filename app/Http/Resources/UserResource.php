<?php

namespace App\Http\Resources;

use App\User;
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
            'is_employee'=>$this->is_employee,
            'is_admin'=>$this->is_admin,
            'bio'=>$this->bio,
            'type'=>new UserTypeResource($this->user_type),
            'proficiency'=>new UserTypeResource($this->proficiency),
            'projects'=>ProjectEmployeeResource::collection($this->assigned_project),
    ];
    }
}
