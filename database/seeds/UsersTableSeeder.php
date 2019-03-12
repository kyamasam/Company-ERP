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
            'password'=>Hash::make('EggNet345&*'),
            'type'=>'1',
            'username'=>'skality',
            'is_employee'=>'1',
            'is_admin'=>'1',
            ]);
        \Illuminate\Support\Facades\DB::table('users')->insert([
            'name'=>'test_admin',
            'email'=>'test_admin@skality.com',
            'password'=>Hash::make('123456'),
            'type'=>'1',
            'is_employee'=>'1',
            'is_admin'=>'1',
            'username'=>'test_admin',
            ]);
        \Illuminate\Support\Facades\DB::table('users')->insert([
            'name'=>'test_employee',
            'email'=>'test_employee@skality.com',
            'password'=>Hash::make('123456'),
            'type'=>'1',
            'is_employee'=>'1',
            'is_admin'=>'0',
            'username'=>'test_employee',
            ]);

        $users = factory(\App\User::class, 30)->create();
    }
}
