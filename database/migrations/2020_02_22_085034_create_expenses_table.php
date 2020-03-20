<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateExpensesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('expenses', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('description');
            $table->float('amount');
            $table->boolean('is_recurrent')->default(false);
            $table->integer('frequency'); //days
            $table->string('receipt'); //receipt uploaded
            $table->integer('business_id')->references('id')->on('businesses');
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
        Schema::dropIfExists('expenses');
    }
}
