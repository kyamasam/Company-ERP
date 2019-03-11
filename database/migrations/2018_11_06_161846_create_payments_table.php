<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('project_id')->references('id')->on('projects')->nullable();
	        $table->integer('invoice_id')->references('id')->on('invoices')->nullable();
            $table->float('amount');
            $table->string('payment_method');
            $table->string('currency');
            $table->integer('confirmed');
            $table->integer('amount_used')->nullable()->default(0);
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
        Schema::dropIfExists('payments');
    }
}
