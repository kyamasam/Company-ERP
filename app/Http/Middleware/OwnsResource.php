<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Response;
class OwnsResource
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next, $user_id)
    {

//        $logged_in_user=$request->user();
//        if ($logged_in_user->id !=$user_id ){
//            return Response::json(array(
//            'code'      =>  401,
//            'message'   =>  "you_dont_this_resource"
//            ), 401);
//        }
        return $next($request);
    }
}
