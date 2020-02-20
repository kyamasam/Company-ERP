<?php

use Illuminate\Database\Seeder;

class Product_categoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $product_categories = factory(\App\product_category::class, 30)->create();
    }
}
