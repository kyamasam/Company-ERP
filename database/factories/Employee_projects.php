<?php

use Faker\Generator as Faker;

$factory->define(\App\employee_project::class, function (Faker $faker) {
    return [
        'employee_id'=>$faker->numberBetween($min=0, $max=20),
        'project_id'=>$faker->numberBetween($min=0, $max=20)
    ];
});
