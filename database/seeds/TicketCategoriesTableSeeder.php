<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class TicketCategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        DB::table('ticket_categories')->insert([
            'category_name'=>'Payments',
            'priority'=>3,
        ]);
        DB::table('ticket_categories')->insert([
            'category_name'=>'Project',
            'priority'=>2,
        ]);
    }
}
