<?php

use Illuminate\Database\Seeder;

class Quotations_paymentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $quotation_payments = factory(\App\quotation_payment::class, 30)->create();
    }
}
