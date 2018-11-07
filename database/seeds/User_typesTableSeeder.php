<?php

use Illuminate\Database\Seeder;

class User_typesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user_type = factory(\App\user_type::class, 30)->create();

    }
}
