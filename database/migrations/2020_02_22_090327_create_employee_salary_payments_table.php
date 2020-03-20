<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEmployeeSalaryPaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    // records kept when employees are paid
    public function up()
    {
        Schema::create('employee_salary_payments', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('employee_id')->references('id')->on('employees');
            $table->integer('business_id')->references('id')->on('businesses');
            $table->json('statutory_json');
            $table->integer('outgoing_payment_id')->references('id')->on('outgoing_payments');
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
        Schema::dropIfExists('employee_salary_payments');
    }
}
