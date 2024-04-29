<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class Auth extends Controller
{
    public function index()  {
        $loggedIn = Auth::check();
        return inertia('Dashboard', ['loggedIn' => $loggedIn]);
    }
}
