<?php

use Faker\Generator as Faker;

$factory->define(\App\Subscription::class, function (Faker $faker) {
    return [
        'user_id'=>$faker->numberBetween(0,30),
        'product_id'=>$faker->numberBetween(0,30),
        'start_date'=>\Carbon\Carbon::now(),
        'expiry_date'=>\Carbon\Carbon::now()->addDays($faker->numberBetween(0,30)),
        'payment_id'=>$faker->numberBetween(0,30)
    ];
});
