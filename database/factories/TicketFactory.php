<?php

use Faker\Generator as Faker;

$factory->define(\App\Ticket::class, function (Faker $faker) {
    return [
        'user_id'=> $faker->numberBetween(1,30),
        'title'=> $faker->title,
        'description'=> $faker->text,
        'category'=> $faker->numberBetween(1,2),
        'resolved'=> 0,
        'assigned_to'=> $faker->numberBetween(1,30),
    ];
});
