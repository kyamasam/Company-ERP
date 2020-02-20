<?php

use Faker\Generator as Faker;

$factory->define(\App\user_proficiency::class, function (Faker $faker) {
    return [
        'user_id'=> $faker->numberBetween($min=0, $max=30),
        'proficiency_id'=>$faker->numberBetween($min=0, $max=30),
    ];
});
