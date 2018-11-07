<?php

use Illuminate\Database\Seeder;

class Project_customersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $project_customers = factory(\App\project_customer::class, 30)->create();

    }
}
