<?php

use Faker\Generator as Faker;

$factory->define(\App\product::class, function (Faker $faker) {
    return [
        'name'=> $faker->streetName,
        'price'=> $faker->numberBetween($min=0, $max=20000),
        'association'=>$faker->numberBetween($min=0, $max=30),
    ];
});
