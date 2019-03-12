<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProjectEmployeeResource extends JsonResource
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
            'name'=>$this->name,
            'progress'=>$this->progress,
//            'created_at'=>$this->created_at,
//            'updated_at'=>$this->updated_at
        ];

    }

}
