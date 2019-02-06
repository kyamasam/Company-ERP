<?php

namespace App\Http\Controllers;
use GuzzleHttp;
use Illuminate\Http\Request;

class TokenController extends Controller
{
    public function lists(){
        $http = new GuzzleHttp\Client(['timeout'  => 12.0]);

        $response = $http->post('http://127.0.0.1:8000/oauth/token', [
            'form_params' => [
                'grant_type' => 'password',
                'client_id' => 4,
                'client_secret' => 'vVWXzKkbWeyqRw6rj2Y802BqQNwTUn1GEKLLp6nq',
                'username' => 'samuel@skality.com',
                'password' => '123456',
                'scope' => '*',
            ],
        ]);

        return $response;
    }
    public function tokens()
    {
        return view('layouts.me');
    }
}
