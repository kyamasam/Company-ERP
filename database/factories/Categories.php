<?php

use Faker\Generator as Faker;

$factory->define(Model::class, function (Faker $faker) {
    return [
        'name'=>$faker->realText($maxNbChars = 1, $indexSize = 2)
    ];
});
