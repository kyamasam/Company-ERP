<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectsResource;
use App\project;
use App\User;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
//        ProjectsResource::withoutWrapping();

        return ProjectsResource::collection(project::paginate());

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'progress' => 'required',
            'description' => 'required',
        ]);
        $business = new project;
        $business->name = $request->name;
        $business->progress = $request->progress;
        $business->description = $request->description;

        $business->save();

        //associating users to projects
        //customers
        foreach ([$request->customers] as $customer){
            $customers = User::find($customer);
            $customers->project()->attach($business->id);
        }

        //developers
        $developers =[$request->developers];
        foreach ($developers as $developer){
            $business->assigned_employee()->attach($developer);
        }

        return json_encode('saved '.$request->name.' successfully');


    }

    /**
     * Display the specified resource.
     *
     * @param  \App\project  $project
     * @return \Illuminate\Http\Response
     */
    public function show(project $project)
    {
//        ProjectsResource::withoutWrapping();

        return new ProjectsResource($project);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\project  $project
     * @return \Illuminate\Http\Response
     */
    public function edit(project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\project  $project
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\project  $project
     * @return \Illuminate\Http\Response
     */
    public function destroy(project $project)
    {
        //
    }

    /**
     * Count either the completed or incomplete projects.
     *
     * @param  $completion_status
     * @return \Illuminate\Http\Response
     */
    public function complete_count($completion_status = null)
    {

        if (!(isset($completion_status))) {
            //if the user has not specified a status, then just look for the completed projects

            $projects = project::where('progress', '=', '10')->count();
        } else {
            //if user has specified the status, then just obey the user and give them what they asked for
            if ($completion_status == 1) {
                $projects = project::where('progress', '=', '10')->count();
            } else {
                $projects = project::where('progress', '<=', '9')->count();

            }

        }


        return json_encode($projects);
    }

}
