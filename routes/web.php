<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\Home;
use App\Http\Controllers\Products;
use App\Http\Controllers\UserController;
use Inertia\Inertia;
use Mockery\Matcher\MultiArgumentClosure;

Route::get('/', [Home::class, 'index'])->name('home');
Route::get('/about-us', [Home::class, 'about_us'])->name('about_us');
Route::group([], function () {
    Route::get('/products', [Products::class, 'index'])->name('products');
    Route::get('/products/x-banners', [Products::class, 'xbanners'])->name('products.x-banners');
    Route::get('/products/pull-ups', [Products::class, 'pullups'])->name('products.pull-ups');
    Route::get('/products/mugs', [Products::class, 'mugs'])->name('products.mugs');
});
Route::get('user/dashboard', [UserController::class, 'index'] )->middleware(['auth', 'verified', 'user'])->name('dashboard');
Route::middleware(['auth', 'verified', 'admin'])->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'index'] )->name('adminDashboard');
    Route::get('/admin/user-manage', [AdminController::class, 'user_manage'] )->name('adminusers');
    Route::post('/updateUserRole/{userId}', [AdminController::class, 'updateUserRole']);
    Route::get('/admin/settings', [AdminController::class, 'settings'])->name('adminsettings');
    Route::get('/admin/products', [AdminController::class, 'products'])->name('adminproducts');
    Route::get('/admin/add-new-product', [AdminController::class, 'addNewProduct'])->name('adminaddProduct');
    Route::get('/admin/offers', [AdminController::class, 'offers'])->name('adminoffers');
    Route::post('/admin/add-new-offer', [AdminController::class, 'adminAddoffer'])->name('adminAddoffer');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
