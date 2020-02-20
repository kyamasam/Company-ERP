<?php

use Illuminate\Database\Seeder;

class User_proficienciesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user_proficiency = factory(\App\user_proficiency::class, 30)->create();

    }
}
