<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateInvoicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('customer_id')->references('id')->on('customers');
            $table->boolean('fully_paid')->default(false);
            $table->date('date_due');
            $table->integer('business_id')->references('id')->on('businesses');
            $table->boolean('is_quotation')->default(false);
            $table->text('invoice_footer');
            $table->text('notes');
            $table->boolean('is_template')->default(false);
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
        Schema::dropIfExists('invoices');
    }
}
