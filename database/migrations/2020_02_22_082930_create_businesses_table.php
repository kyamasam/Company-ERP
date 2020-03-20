<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBusinessesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('businesses', function (Blueprint $table) {
            $table->increments('id');
            $table->string( 'name');
            $table->string( 'city_name');
            $table->string( 'country');
            $table->string( 'business_contact');
            $table->integer( 'business_category_id')->refernces('id')->on('business_categories');;
            $table->string( 'other_category'); //stored when the business is of category not listed
            $table->text( 'business_description');
            $table->integer( 'business_owner_id')->references('id')->on('users');
            $table->integer( 'number_of_employees');
            $table->string( 'logo');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('businesses');
    }
}
