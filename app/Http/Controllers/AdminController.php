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
            $app_version = env('App_version');
            return Inertia::render('Admin/settings', [
                'app_version' => $app_version,
            ]);
        } else {
            return Inertia::render('errors/permitiondenied');
        }
    }

    public function products() {
        $role = Auth::user()->role;
        if ($role === 'admin') {
            $products = Product::with('priceLists', 'variants')->get();
            $productsWithPrices = $products->map(function($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'simple_description' => $product->simple_description,
                    'description' => $product->description,
                    'published' => $product->published,
                    'template_type' => $product->template_type,
                    'variants' => $product->variants->map(function ($variant) {
                        return [
                            'id' => $variant->id,
                            'related_product_ids' => $variant->related_product_ids,
                            'related_products' => $variant->relatedProducts()
                        ];
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
            $validatedData = $request->validate([
                'title' => ['required', 'string', 'max:255'],
                'img' => ['required', 'image', 'mimes:jpg,jpeg,png,gif'],
                'valid_from' => ['required', 'date'],
                'valid_till' => ['required', 'date', 'after_or_equal:valid_from'],
                'description' => ['required', 'string'],
                'price' => ['required', 'numeric', 'min:0', 'max:100'],
            ]);

            // Upload image
            $image = $request->file('img');
            $uniqueName = hash('sha256', now()->timestamp . $image->getClientOriginalName()) . '.' . $image->extension();
            $image->move(public_path('upload/offers'), $uniqueName);
            $imagePath = '/upload/offers/' . $uniqueName;

            // Create a new offer
            Offer::create([
                'title' => $validatedData['title'],
                'from_date' => $validatedData['valid_from'],
                'end_date' => $validatedData['valid_till'],
                'description' => $validatedData['description'],
                'price' => $validatedData['price'],
                'img' => $imagePath,
            ]);

            // Redirect or return a success response
            return redirect()->route('adminoffers')->with('success', 'Offer added successfully!');
        } else {
            // Unauthorized access
            return Inertia::render('errors/permitiondenied');
        }
    }

    public function Admineditoffer(Request $request, $offerId) {
        $role = Auth::user()->role;

        if ($role === 'admin') {
            // Validate the request
            $validatedData = $request->validate([
                'etitle' => ['required', 'string', 'max:255'],
                'eimg' => ['nullable', 'image', 'mimes:jpg,jpeg,png,gif'],
                'evalid_from' => ['required', 'date'],
                'evalid_till' => ['required', 'date', 'after_or_equal:evalid_from'],
                'edescription' => ['required', 'string'],
                'eprice' => ['required', 'numeric', 'min:0'],
            ]);

            // Find the offer
            $offer = Offer::findOrFail($offerId);

            if ($request->hasFile('eimg')) {
                // Delete the old image if it exists
                if ($offer->img) {
                    $oldImagePath = public_path($offer->img);
                    if (file_exists($oldImagePath)) {
                        unlink($oldImagePath);
                    }
                }

                // Upload new image
                $image = $request->file('eimg');
                $uniqueName = hash('sha256', now()->timestamp . $image->getClientOriginalName()) . '.' . $image->extension();
                $image->move(public_path('upload/offers'), $uniqueName);
                $offer->img = '/upload/offers/' . $uniqueName;
            }

            // Update the offer details
            $offer->title = $validatedData['etitle'];
            $offer->from_date = $validatedData['evalid_from'];
            $offer->end_date = $validatedData['evalid_till'];
            $offer->description = $validatedData['edescription'];
            $offer->price = $validatedData['eprice'];
            $offer->save();

            // Redirect or return a success response
            return response()->json(['message' => 'Offer updated successfully']);
        } else {
            return response()->json(['error' => 'Permission denied'], 403);
        }
    }



    public function deleteoffer(Request $request, $offerId) {
        $role = Auth::user()->role;

        if ($role === 'admin') {
            // Find the offer
            $offer = Offer::findOrFail($offerId);

            // Delete the image if it exists
            if ($offer->img) {
                $imagePath = public_path($offer->img);
                if (file_exists($imagePath)) {
                    unlink($imagePath);
                }
            }

            // Delete the offer
            $offer->delete();

            // Redirect or return a success response
            return redirect()->route('adminoffers')->with('success', 'Offer deleted successfully!');
        } else {
            return Inertia::render('errors/permitiondenied');
        }
    }

    public function quickAction(Request $request) {
        $role = Auth::user()->role;

        if ($role === 'admin') {
            $product = Product::find($request->id);
            if ($product) {
                $product->published = $request->published;
                $product->save();
                return response()->json(['message' => 'Product status updated successfully.']);
            } else {
                return response()->json(['message' => 'Product not found.'], 404);
            }
        } else {
            return Inertia::render('errors/permitiondenied');
        }
    }
}
