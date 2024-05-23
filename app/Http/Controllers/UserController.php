<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index() {
        $role = Auth::user()->role;
        if ($role === 'manager') {
            return redirect('manager/dashboard');
        } elseif ($role === 'user') {
            return Inertia::render('User/dashboard');
        } elseif ($role === 'designer') {
            return redirect('designer/dashboard');
        } elseif ($role === 'admin') {
            return redirect('admin/dashboard');
        } else {
            return Inertia::render('errors/AuthRoleerror');
        }
    }
}
