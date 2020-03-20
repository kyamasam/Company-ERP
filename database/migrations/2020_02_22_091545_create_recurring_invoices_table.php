<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRecurringInvoicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('recurring_invoices', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('customer_id')->references('id')->on('customers');
            $table->integer('frequency'); //days
            $table->integer('business_id')->references('id')->on('businesses');
            $table->boolean('is_quotation')->default(false);
            $table->text('invoice_footer');
            $table->text('notes');
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
        Schema::dropIfExists('recurring_invoices');
    }
}
