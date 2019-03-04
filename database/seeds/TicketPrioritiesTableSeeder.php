<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TicketPrioritiesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('ticket_priorities')->insert([
           'name'=>'low',
            'description'=>'nothing much'
        ]);
        DB::table('ticket_priorities')->insert([
           'name'=>'medium',
            'description'=>'medium priority'
        ]);
        DB::table('ticket_priorities')->insert([
           'name'=>'high',
            'description'=>'this needs to be resolved fast!'
        ]);
    }
}
