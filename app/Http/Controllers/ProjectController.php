<?php

namespace App\Http\Controllers;

use App\employee_project;
use App\Http\Resources\ProductResource;
use App\Http\Resources\ProjectsResource;
use App\project;
use App\project_customer;
use App\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return
     */
    public function index()
    {
//        ProjectsResource::withoutWrapping();

        return ProjectsResource::collection(project::all()->sortByDesc('id'));

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
        $validator=Validator::make($request->all(), [
            'name' => 'required',
            'progress' => 'required',
            'customers' => 'required',
            'developers' => 'required',
            'description' => 'required',
        ]);

        if ($validator->fails()) {
            return json_encode($validator->messages()->first());
        }
        $business = new project;
        $business->name = $request->name;
        $business->progress = $request->progress;
        $business->description = $request->description;

        $business->save();

        //associating users to projects
        //customers
        $customers=explode(',',$request->customers);
        foreach ($customers as $customer){
            $customers = User::find($customer);
            $customers->project()->attach($business->id);
        }

        //developers
        $developers =explode(',', $request->developers);
        foreach ($developers as $developer){
            $business->assigned_employee()->attach($developer);
        }

        return json_encode('successful');


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

        $validator=Validator::make($request->all(), [
            'name' => 'required',
            'progress' => 'required',
//            'customers' => 'required',
//            'developers' => 'required',
            'description' => 'required',
        ]);

        if ($validator->fails()) {
            return json_encode($validator->messages()->first());
        }
        $business = $project;
        $business->name = $request->name;
        $business->progress = $request->progress;
        $business->description = $request->description;

        $business->save();

        //associating users to projects
        //customers
        if(isset($request->customers)){
            $customers=explode(',',$request->customers);
//        $customers->associate($business->id);
            foreach ($customers as $customer){
                $customer_project = User::find($customer);
                $customer_project->project()->sync($business->id);
            }
            project_customer::where('project_id', $business->id)->whereNotIn('user_id', $customers)->delete();
        }
        else{
            //pass
            project_customer::where('project_id', $business->id)->delete();
        }


        //developers
        $developers =explode(',', $request->developers);
        if(isset($request->developers)){
            $business->assigned_employee()->sync($developers);
        }
        else{
            $business->assigned_employee()->sync([]);
        }


        return json_encode('successful');
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

    /**
     * Search for a projects
     *
     * @param  int  $search_term
     * @return string
     */
    public function search($search_term='')
    {
        $result= ProjectsResource::collection(
            project::where('name', 'LIKE', "%{$search_term}%")
                ->orWhere('description', 'LIKE', "%{$search_term}%")

                ->get());
        return $result;
    }
 /**
     * Search for recent project
     *
     * @param
     * @return string
     */
    public function recent()
    {
        $result= ProjectsResource::collection(
            project::where('updated_at', '>=', Carbon::today())->offset(0)->limit(5)

                ->get());
        return $result;
    }

    /**
     * get the projects for the logged in user
     *
     * @param int $user_id
     * @return string
     */


    public function user_projects( $user_id)
    {
        $user=User::find($user_id);


        return ProjectsResource::collection($user->assigned_project()->get());

    }

}
