<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//note that the following routes are used to allow the user to login to the dashboard
//for API authentication, see /routes/api.php
//Route::get('/login', 'Auth\LoginController@login');
Route::get('/logout', 'Auth\LoginController@logout')->name('logout');
Route::get('/register', 'Auth\RegisterController@showRegistrationForm')->name('register');
Route::post('/login', 'Auth\LoginController@login')->name('login');
Route::post('/logout', 'Auth\LoginController@logout');
Route::post('/register', 'Auth\RegisterController@register');
Route::get('lists','TokenController@lists');
//
Route::get('/user', function (Request $request) {
    return \Illuminate\Support\Facades\Auth::user();
});

Route::view('/{path?}', 'app')->where('path', '.*');

//Auth::routes();

//Route::get('/home', 'HomeController@index')->name('home');
