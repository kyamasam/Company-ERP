<?php

use Faker\Generator as Faker;

$factory->define(\App\quotation::class, function (Faker $faker) {
    return [
        'client_id'=>$faker->numberBetween($min=0, $max=20),
    ];
});
