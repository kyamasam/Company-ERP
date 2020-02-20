<?php

use Faker\Generator as Faker;

$factory->define(\App\product_category::class, function (Faker $faker) {
    return [
        'product_id'=>$faker->numberBetween($min=0, $max=20),
        'category_id'=>$faker->numberBetween($min=0, $max=20),
//        'user_id'=>$faker->numberBetween($min=0, $max=20),


    ];
});
