<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserProficiencyResource;
use App\user_proficiency;
use Illuminate\Http\Request;

class UserProficiencyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
//        UserProficiencyResource::withoutWrapping();

        return UserProficiencyResource::collection(User::all()->sortByDesc('id'));
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
     * @param  \App\user_proficiency  $user_proficiency
     * @return \Illuminate\Http\Response
     */
    public function show(user_proficiency $user_proficiency)
    {
//        UserProficiencyResource::withoutWrapping();

        return new UserProficiencyResource($user_proficiency);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\user_proficiency  $user_proficiency
     * @return \Illuminate\Http\Response
     */
    public function edit(user_proficiency $user_proficiency)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\user_proficiency  $user_proficiency
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, user_proficiency $user_proficiency)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\user_proficiency  $user_proficiency
     * @return \Illuminate\Http\Response
     */
    public function destroy(user_proficiency $user_proficiency)
    {
        //
    }
}
