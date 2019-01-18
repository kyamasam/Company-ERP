<?php

use Faker\Generator as Faker;

$factory->define(App\payment::class, function (Faker $faker) {
    return [
        'project_id'=>$faker->numberBetween($min=0, $max=20),
        'invoice_id'=>$faker->numberBetween($min=0, $max=20),
        'amount'=>$faker->numberBetween($min=0, $max=20000),
        'payment_method'=>$faker->creditCardType,
        'currency'=>$faker->currencyCode,
        'confirmed'=>$faker->numberBetween($min=0, $max=1),


    ];
});
