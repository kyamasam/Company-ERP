<?php

use Illuminate\Database\Seeder;

class ProficienciesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $proficiencies = factory(\App\proficiency::class, 30)->create();
    }
}
