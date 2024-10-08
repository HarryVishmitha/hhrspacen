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
use App\Models\Category;

class Products extends Controller
{
    public function index() {
        // Fetch products with associated categories, price lists, and variants
        $products = Product::with(['categories', 'priceLists', 'variants'])
            ->where('published', true)
            ->get();
        // Fetch all categories
        $categories = Category::all();
        $productsWithDetails = $products->map(function($product) {
            return [
                'id' => $product->id,
                'name' => $product->name,
                'simple_description' => $product->simple_description,
                'description' => $product->description,
                'published' => $product->published,
                'template_type' => $product->template_type,
    
                // Map categories since the relationship is many-to-many
                'categories' => $product->categories->map(function($category) {
                    return $category->name;
                })->toArray(),  // Array of category names
    
                'variants' => $product->variants->map(function($variant) {
                    return [
                        'variant_type' => $variant->variant_type,
                        'variant_value' => $variant->variant_value,
                        'price' => $variant->price,
                        'stock' => $variant->stock,
                    ];
                }),
    
                'prices' => $product->priceLists->map(function($priceList) {
                    return [
                        'price' => $priceList->price,
                        'updated_on' => $priceList->updated_on,
                    ];
                }),
    
                'links' => json_decode($product->links, true)['image_paths'] ?? [],
    
                'first_img' => !empty(json_decode($product->links, true)['image_paths'][0]) ?
                               json_decode($product->links, true)['image_paths'][0] :
                               "/upload/products/default-product-01.jpg",
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
            'products' => $productsWithDetails,
            'categories' => $categories, // Pass categories to the frontend
        ]);
    }
    

    public function show($productId, $productName) {
        // Fetch the product along with its categories, price lists, and variants
        $product = Product::with(['categories', 'priceLists', 'variants'])->findOrFail($productId);
    
        $links = json_decode($product->links, true);
        $first_image = !empty($links['image_paths'][0]) ? $links['image_paths'][0] : "/upload/products/default-product-01.jpg";
    
        $productData = [
            'id' => $product->id,
            'name' => $product->name,
            'simple_description' => $product->simple_description,
            'description' => $product->description,
            'published' => $product->published,
            'template_type' => $product->template_type,
            'categories' => $product->categories->map(function($category) {
                return [
                    'id' => $category->id,
                    'name' => $category->name,
                ];
            }),
            'variants' => $product->variants->map(function($variant) {
                return [
                    'variant_type' => $variant->variant_type,
                    'variant_value' => $variant->variant_value,
                    'price' => $variant->price,
                    'stock' => $variant->stock,
                ];
            }),
            'prices' => $product->priceLists->map(function($priceList) {
                return [
                    'price' => $priceList->price,
                    'updated_on' => $priceList->updated_on,
                ];
            }),
    
            'links' => !empty($links['image_paths']) ? $links['image_paths'] : ["/upload/products/default-product-01.jpg"],
            'first_img' => $first_image,
        ];
    
        return Inertia::render('Products/productDetail', [
            'product' => $productData,
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
