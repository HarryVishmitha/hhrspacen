<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

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
            return Inertia::render('Admin/products');
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
}
