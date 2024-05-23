<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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

    public function user_manage() {
        $role = Auth::user()->role;
        if ($role === 'admin') {
            return Inertia::render('Admin/user_manage');
        } else {
            return Inertia::render('errors/permitiondenied');
        }

    }
}
