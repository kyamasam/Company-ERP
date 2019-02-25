<?php

use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(App\User::class, function (Faker $faker) {
    $myname=$faker->firstName;
    return [
        'name' => $myname,
        'type' => $faker->numberBetween($min=0, $max=10),
        'username' => $faker->name,
        'user_avatar' => $faker->imageUrl($width = 640, $height = 480, 'people'),
        'email' => $faker->unique()->safeEmail,
        'email_verified_at' => now(),
        'bio' => $faker->sentence(),
        'password' => '$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm', // secret
        'remember_token' => str_random(10),
    ];
});
