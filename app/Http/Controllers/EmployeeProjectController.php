<?php

namespace App\Http\Controllers;

use App\employee_project;
use App\Http\Resources\EmployeeProjectResource;
use App\project;
use App\User;
use Illuminate\Http\Request;

class EmployeeProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
//        EmployeeProjectResource::withoutWrapping();

        return EmployeeProjectResource::collection(User::all()->sortByDesc('id'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\employee_project  $employee_project
     * @return \Illuminate\Http\Response
     */
    public function show(employee_project $employee_project)
    {
//        EmployeeProjectResource::withoutWrapping();

        return EmployeeProjectResource::collection(User::find($employee_project));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\employee_project  $employee_project
     * @return \Illuminate\Http\Response
     */
    public function edit(employee_project $employee_project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\employee_project  $employee_project
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, employee_project $employee_project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\employee_project  $employee_project
     * @return \Illuminate\Http\Response
     */
    public function destroy(employee_project $employee_project)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\employee_project  $employee_project
     * @return \Illuminate\Http\Response
     */
    public function projects(employee_project $employee_project)
    {
//        EmployeeProjectResource::withoutWrapping();

        return EmployeeProjectResource::collection(User::find($employee_project)->assigned_project);
    }
}
