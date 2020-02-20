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

Route::post('login', 'Auth\LoginController@login');
Route::post('/logout', 'Auth\LoginController@logout');
Route::post('register', 'Auth\RegisterController@register');
Route::get('/user', function (Request $request) {
    return \Illuminate\Support\Facades\Auth::user();
});
Route::view('/{path?}', 'app')->where('path','.*');


Route::get('/home', 'HomeController@index')->name('home');
