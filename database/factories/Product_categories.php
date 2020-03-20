<?php

use Faker\Generator as Faker;

$factory->define(\App\ProductCategory::class, function (Faker $faker) {
    return [
        'product_id'=>$faker->numberBetween($min=0, $max=20),
        'category_id'=>$faker->numberBetween($min=0, $max=20),
//        'user_id'=>$faker->numberBetween($min=0, $max=20),


    ];
});
