<?php

use Faker\Generator as Faker;

$factory->define(App\payment::class, function (Faker $faker) {
    return [

        'project_id'=>$faker->numberBetween($min=0, $max=20),
        'invoice_id'=>$faker->numberBetween($min=0, $max=20)

    ];
});
