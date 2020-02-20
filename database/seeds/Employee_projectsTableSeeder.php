<?php

use Illuminate\Database\Seeder;

class Employee_projectsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $employee_projects = factory(\App\employee_project::class, 30)->create();
    }
}
