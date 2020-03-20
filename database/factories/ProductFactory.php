<?php

use Faker\Generator as Faker;

$factory->define(\App\Product::class, function (Faker $faker) {
    return [
        'name'=> $faker->streetName,
        'price'=> $faker->numberBetween($min=0, $max=20000),
        'association'=>$faker->numberBetween($min=0, $max=30),
        'subscription_duration'=>$faker->numberBetween($min=0, $max=30),
    ];
});
