<?php

use Illuminate\Database\Seeder;

class Quotation_productsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $quotation_products = factory(\App\quotation_product::class, 30)->create();

    }
}
