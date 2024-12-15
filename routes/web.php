<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth', 'verified')->group(function () {
    //  Core operation pages
    Route::get('/Dashboard', function () {
        return Inertia::render('Core/Dashboard');
    })->name('Dashboard');

    Route::get('/History', function () {
        return Inertia::render('Core/History');
    })->name('History');
    
    Route::get('/Expenses', function () {
        return Inertia::render('Core/Expenses');
    })->name('Expenses');
    
    Route::get('/Expenses/AddExpense', function () {
        return Inertia::render('Core/AddExpense');
    })->name('AddExpense');
    
    Route::get('/Profile', function () {
        return Inertia::render('Core/Profile');
    })->name('Profile');

    Route::get('/profile', [ProfileController::class, 'index'])->name('profile');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Route::get('/oldDashboard', function () {
//     return Inertia::render('oldDashboard');
// })->middleware(['auth', 'verified'])->name('oldDashboard');

require __DIR__.'/auth.php';
