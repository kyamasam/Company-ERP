<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::group(['prefix'=>'v1','as'=>'v1.'], function(){
    Route::middleware('auth:api')->get('/user', function (Request $request) {
        return $request->user();
    });
    Route::resource('products', 'ProductController');
    Route::resource('systemuser', 'SystemUserController');
    Route::resource('projects', 'ProjectController');
    Route::resource('quotations', 'QuotationController');
    Route::resource('payments', 'PaymentController');
    Route::resource('proficiencies', 'ProficiencyController');
    Route::resource('categories', 'CategoryController');
    Route::resource('employees', 'EmployeeProjectController');
    Route::resource('user_types', 'UserTypeController');

});
