<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class Auth extends Controller
{
    public function index()  {
        $loggedIn = Auth::check();
        if (Auth::user()->role === 'admin') {
            return inertia('adminDashboard', ['loggedIn' => $loggedIn]);
        }
        return inertia('Dashboard', ['loggedIn' => $loggedIn]);
    }
}
