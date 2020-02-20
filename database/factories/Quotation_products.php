<?php

use Faker\Generator as Faker;

$factory->define(\App\quotation_product::class, function (Faker $faker) {
    return [
        'quotation_id'=>$faker->numberBetween($min=0, $max=20),
        'product_id'=>$faker->numberBetween($min=0, $max=20),
        'project_id'=>$faker->numberBetween($min=0, $max=20),
    ];
});
