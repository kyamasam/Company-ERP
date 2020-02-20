<?php

use Faker\Generator as Faker;

$factory->define(\App\proficiency::class, function (Faker $faker) {
    return [
        'name'=>$faker->word,
        'description'=>$faker->realText($maxNbChars = 10, $indexSize = 2)
    ];
});
