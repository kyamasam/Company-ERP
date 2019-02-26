<?php

use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\Hash;
class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = factory(\App\User::class, 30)->create();

        \Illuminate\Support\Facades\DB::table('users')->insert([
            'name'=>'developers',
            'email'=>'developers@skality.com',
            'password'=>Hash::make('123456'),
            'type'=>'1',
            'username'=>'skality',
            ]);
    }
}
