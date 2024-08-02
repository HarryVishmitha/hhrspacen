<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Offer;
use Carbon\Carbon;
use App\Models\Product;

class AdminController extends Controller
{
    public function __construct()
    {

    }
    public function index(Request $request) {
        $role = Auth::user()->role;
        if ($role === 'manager') {
            return redirect('manager/dashboard');
        } elseif ($role === 'user') {
            return redirect('dashboard');
        } elseif ($role === 'designer') {
            return redirect('designer/dashboard');
        } elseif ($role === 'admin') {
            return Inertia::render('Admin/Dashboard', [
                'auth1' => [
                    'user' => 'Thejan',
                ],
            ]);
        } else {
            return Inertia::render('errors/AuthRoleerror');
        }

    }

    public function user_manage(Request $request) {
        $role = Auth::user()->role;
        if ($role === 'admin') {
            $users = User::all();
            // Define the number of records per page
            $perPage = 25;

            // Get the current page from the query string, default to 1
            $currentPage = $request->query('page', 1);

            // Query to fetch users with pagination
            $users = User::paginate($perPage, ['*'], 'page', $currentPage);

            return Inertia::render('Admin/user_manage', [
                'users' => $users->items(),
                'pagination' => $users->toArray()
            ]);
        } else {
            return Inertia::render('errors/permitiondenied');
        }

    }

    public function updateUserRole(Request $request, $userId) {
        $role = Auth::user()->role;
        if ($role === 'admin') {
            // Validate the request
            $request->validate([
                'role' => 'required|in:admin,user,manager,designer',
            ]);

            // Find the user
            $user = User::findOrFail($userId);

            // Update the user role
            $user->role = $request->role;
            $user->save();

            // Redirect back or return JSON response as needed
            return response()->json(['message' => 'User role updated successfully']);
        } else {
            return response()->json(['error' => 'Permission denied'], 403);
        }
    }
    public function settings() {
        $role = Auth::user()->role;
        if ($role === 'admin') {
            return Inertia::render('Admin/settings');
        } else {
            return Inertia::render('errors/permitiondenied');
        }
    }

    public function products() {
        $role = Auth::user()->role;
        if ($role === 'admin') {
            $products = Product::with('priceLists')->where('published', true)->get();
            $productsWithPrices = $products->map(function($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'simple_description' => $product->simple_description,
                    'description' => $product->description,
                    'published' => $product->published,
                    'template_type' => $product->template_type,
                    'variants' => $product->variants->map(function($variant) {
                        return $variant->only('id', 'related_product_ids');
                    }),
                    'prices' => $product->priceLists->map(function($priceList) {
                        return [
                            'price' => $priceList->price,
                            'updated_on' => $priceList->updated_on,
                        ];
                    })
                ];
            });
            return Inertia::render('Admin/products', [
                'products' => $productsWithPrices,
            ]);
        } else {
            return Inertia::render('errors/permitiondenied');
        }
    }
    public function addNewProduct() {
        $role = Auth::user()->role;
        if ($role === 'admin') {
            return Inertia::render('Admin/add_new_product', [
                'nav' => [
                    'back' => "adminproducts",
                    'title' => "Add New Product",
                ],
            ]);
        } else {
            return Inertia::render('errors/permitiondenied');
        }
    }
    public function offers(Request $request) {
        $role = Auth::user()->role;
        if ($role === 'admin') {
            $offers = Offer::all();
            $offersExist = $offers->isNotEmpty();
            return Inertia::render('Admin/offers',
        [
            'offers' => $offers,
            'offersExist' => $offersExist,
        ]);
        } else {
            return Inertia::render('errors/permitiondenied');
        }
    }
    public function adminAddoffer(Request $request) {
        $role = Auth::user()->role;
        if ($role === 'admin') {
            // Validate the request
            $request->validate([
                'title' => 'required|string|max:255',
                'img'  => 'required|image|mimes:jpg,jpeg,png,gif',
                'valid_from' => 'required|date',
                'valid_till' => 'required|date|after_or_equal:valid_from',
                'description' => 'required|string',
                'price' => 'numeric|min:0|required',
            ]);

            //upload img
            $image = $request->file('img');
            $currentDateTime = Carbon::now()->format('Ymd_His');
            $encyptedName =  hash('sha256', $currentDateTime) . '.' . $image->getClientOriginalExtension();
            $path = $image->storeAs('images', $encyptedName, 'public');

            // Create a new offer
            Offer::create([
                'title' => $request->title,
                'from_date' => $request->valid_from,
                'end_date' => $request->valid_till,
                'description' => $request->description,
                'price' => $request->price,
                'img' => $path,
            ]);

            // Redirect or return a success response
            return redirect()->route('adminoffers')->with('success', 'Offer added successfully!');
        } else {
            return Inertia::render('errors/permitiondenied');
        }
    }
}
