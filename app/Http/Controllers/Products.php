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

class Products extends Controller
{
    public function index() {
        $products = Product::with('priceLists')->where('published', true)->get();
        $productsWithPrices = $products->map(function($product) {
            // Decode the JSON string to an array
            $links = json_decode($product->links, true);
            return [
                'id' => $product->id,
                'name' => $product->name,
                'simple_description' => $product->simple_description,
                'description' => $product->description,
                'published' => $product->published,
                'template_type' => $product->template_type,
                'vearients' => $product->vearients,
                'prices' => $product->priceLists->map(function($priceList) {
                    return [
                        'price' => $priceList->price,
                        'updated_on' => $priceList->updated_on,
                    ];
                }),
                'links' => $links['image_paths'] ?? [],
                'first_img' => $links['image_paths'][0],
            ];
        });

        $offers = Offer::all();
        $offersExist = $offers->isNotEmpty();

        return Inertia::render('Products/products', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'offers' => $offers,
            'offersExist' => $offersExist,
            'products' => $productsWithPrices,
        ]);
    }

    public function xbanners() {
        print('xbanner');
    }

    public function pullups() {
        print('pullups');
    }

    public function mugs() {
        print('mugs');
    }
}
