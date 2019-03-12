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


        \Illuminate\Support\Facades\DB::table('users')->insert([
            'name'=>'developers',
            'email'=>'developers@skality.com',
            'password'=>Hash::make('123456'),
            'type'=>'1',
            'username'=>'skality',
            ]);
        \Illuminate\Support\Facades\DB::table('users')->insert([
            'name'=>'oscar',
            'email'=>'oscar@skality.com',
            'password'=>Hash::make('123456'),
            'type'=>'1',
            'is_employee'=>'1',
            'username'=>'oscar',
            ]);

        $users = factory(\App\User::class, 30)->create();
    }
}
