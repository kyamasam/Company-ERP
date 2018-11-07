<?php

use Faker\Generator as Faker;

$factory->define(\App\project::class, function (Faker $faker) {
    return [
        'name'=>$faker->company,
        'customers'=>$faker->NumberBetween($min = 0, $max = 30),
        'progress'=>$faker->biasedNumberBetween($min = 0, $max = 10, $function = 'sqrt'),
    ];
});
