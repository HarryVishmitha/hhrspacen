<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\UserController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::get('user/dashboard', [UserController::class, 'index'] )->middleware(['auth', 'verified', 'user'])->name('dashboard');
Route::middleware(['auth', 'verified', 'admin'])->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'index'] )->name('adminDashboard');
    Route::get('/admin/user-manage', [AdminController::class, 'user_manage'] )->name('adminusers');
    Route::post('/updateUserRole/{userId}', [AdminController::class, 'updateUserRole']);
    Route::get('/admin/settings', [AdminController::class, 'settings'])->name('adminsettings');
    Route::get('/admin/products', [AdminController::class, 'products'])->name('adminproducts');
    Route::get('/admin/add-new-product', [AdminController::class, 'addNewProduct'])->name('adminaddProduct');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
