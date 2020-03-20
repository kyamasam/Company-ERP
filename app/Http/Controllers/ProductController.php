<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Product;
use App\ProductCategory;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
//        ProductResource::withoutWrapping();

        return ProductResource::collection(\App\Product::all()->sortByDesc('id'));

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator=Validator::make($request->all(), [
            'name' => 'required',
            'price' => 'required|integer',
            'category'=>'required|string',
            'subscription_duration'=>'required|integer',

        ]);
        if ($validator->fails()) {
            return json_encode($validator->messages()->first());
        }
        $categories=explode(',',$request->category);
        //run second validator to check if contents of string are integers
        foreach ($categories as $category) {
            if (!is_numeric($category)){
                return json_encode("all category values must be integers");
            }
        }

        $product = new Product;
        $product->name = $request->name;
        $product->price = $request->price;
        $product->subscription_duration = $request->subscription_duration;

        $product->save();


        foreach ($categories as $category){
            $product_category=  new ProductCategory;
            $product_category->product_id = $product->id;
            $product_category->category_id = $category;
            $product_category->save();
        }


        return json_encode('successful');

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
//        ProductResource::withoutWrapping();

        return new ProductResource($product);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        $validator=Validator::make($request->all(), [
            'name' => 'required',
            'price' => 'required|integer',
            'category'=>'required|string',
            'subscription_duration'=>'required|integer',

        ]);
        if ($validator->fails()) {
            return json_encode($validator->messages()->first());
        }
        $categories=explode(',',$request->category);
        //run second validator to check if contents of string are integers
        foreach ($categories as $category) {
            if (!is_numeric($category)){
                return json_encode("all category values must be integers");
            }
        }

        $edit_product =$product;
        $edit_product->name = $request->name;
        $edit_product->price = $request->price;
        $edit_product->subscription_duration = $request->subscription_duration;

        $product->save();


        foreach ($categories as $category){
            $product_category=  new ProductCategory;
            $product_category->product_id = $edit_product->id;
            $product_category->category_id = $category;
            $product_category->save();
        }


        return json_encode('successful');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        //
    }

    /**
     * Search for a products
     *
     * @param  int  $search_term
     * @return string
     */
    public function search($search_term='')
    {
        $result= ProductResource::collection(
            Product::where('name', 'LIKE', "%{$search_term}%")
                ->get());
        return $result;
    }
}
