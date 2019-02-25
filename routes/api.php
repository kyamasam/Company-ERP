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

//
    Route::group(['middleware' => 'auth:api'], function() {
        Route::get('user', function (Request $request) {
            return $request->user();
        });
    });

        Route::resource('users', 'SystemUserController');

        Route::resource('products', 'ProductController');
        Route::get('systemuser/q/{search_term?}', 'SystemUserController@search');
        Route::resource('systemuser', 'SystemUserController');


        Route::get('projects/count/{completion_status?}', 'ProjectController@complete_count')->where('completion_status', '[0-9]+');
        Route::resource('projects', 'ProjectController');

        Route::resource('quotations', 'QuotationController');

        //extending the laravel api resource

        Route::get('payments/sum_payments_within/{end_at}/{start_from?}', 'PaymentController@sum_payments_within')->where('no_of_days', '[0-9]+')->where('start_comparing_from', '[0-9+]');
        Route::get('payments/count_payments_within/{end_at}/{start_from?}', 'PaymentController@count_payments_within')->where('no_of_days', '[0-9]+')->where('start_comparing_from', '[0-9+]');
        Route::get('payments/invoice/{invoice_id}', 'PaymentController@payment_for_invoice');
        Route::resource('payments', 'PaymentController');

        Route::resource('invoices', 'InvoiceController');
        Route::resource('proficiencies', 'ProficiencyController');
        Route::resource('categories', 'CategoryController');
        Route::resource('employees', 'EmployeeProjectController');
        Route::resource('user_types', 'UserTypeController');
//    });

});
