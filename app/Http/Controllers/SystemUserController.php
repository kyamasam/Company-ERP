<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\User;
use Illuminate\Http\Request;
use PHPUnit\Util\Json;

class SystemUserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

//        UserResource::withoutWrapping();


        return UserResource::collection(User::all()->sortByDesc('id'));

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
     * @param  int  $id
     * @return string
     */
    public function show($id)
    {
        $user=\App\User::findOrFail($id);
//        UserResource::withoutWrapping();


        return new UserResource($user);
//             ArticleResource::withoutWrapping();
//        return new ArticleResource($article);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    /**
     * Show the projects this user is involved in the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function assigned_projects(Request $request, $id)
    {
        //
    }
      /**
     * Search for a user
     *
     * @param  int  $search_term
     * @return string
     */
    public function search($search_term='a')
    {
        $result= UserResource::collection(
            User::where('name', 'LIKE', "%{$search_term}%")
            ->orWhere('email', 'LIKE', "%{$search_term}%")
            ->orWhere('username', 'LIKE', "%{$search_term}%")
            ->get());
        return $result;

    }







}
