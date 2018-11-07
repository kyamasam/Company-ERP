<?php

use Faker\Generator as Faker;

$factory->define(\App\project_customer::class, function (Faker $faker) {
    return [
        'project_id'=>$faker->numberBetween($min=0, $max=20),
        'customer_id'=>$faker->numberBetween($min=0, $max=20)
    ];
});
