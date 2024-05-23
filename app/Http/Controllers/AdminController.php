<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    public function index() {
        $role = Auth::user()->role;
        if ($role === 'manager') {
            return redirect('manager/dashboard');
        } elseif ($role === 'user') {
            return redirect('dashboard');
        } elseif ($role === 'designer') {
            return redirect('designer/dashboard');
        } elseif ($role === 'admin') {
            return Inertia::render('Admin/Dashboard');
        } else {
            return Inertia::render('errors/AuthRoleerror');
        }
    }
}
