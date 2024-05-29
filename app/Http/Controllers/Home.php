<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Models\User;
use App\Models\Offer;
use App\Models\Product;
use App\Models\PriceList;

class Home extends Controller
{
    public function index() {
        $products = Product::with('priceLists')->get();
        $productsWithPrices = $products->map(function($product) {
            return [
                'id' => $product->id,
                'name' => $product->name,
                'simple_description' => $product->simple_description,
                'description' => $product->description,
                'published' => $product->published,
                'template_type' => $product->template_type,
                'prices' => $product->priceLists->map(function($priceList) {
                    return [
                        'price' => $priceList->price,
                        'updated_on' => $priceList->updated_on,
                    ];
                })
            ];
        });

        $offers = Offer::all();
        $offersExist = $offers->isNotEmpty();
        return Inertia::render('Home', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'offers' => $offers,
            'offersExist' => $offersExist,
            'products' => $productsWithPrices,
        ]);
    }
}
