<?php

use Faker\Generator as Faker;

$factory->define(\App\quotation_payment::class, function (Faker $faker) {
    return [
        'quotation_id'=>$faker->numberBetween($min=0, $max=20),
        'payment_id'=>$faker->numberBetween($min=0, $max=20),
    ];
});
