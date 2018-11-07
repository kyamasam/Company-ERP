<?php

use Faker\Generator as Faker;

$factory->define(\App\user_type::class, function (Faker $faker) {
    return [
        'type'=>$faker->numberBetween($min=0, $max=20),
    ];
});
