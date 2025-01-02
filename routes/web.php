<?php

// Controller
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ExpenseController;

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

Route::middleware('auth')->group(function () {
    //  Core operation pages
    // Dashboard
    Route::get('/Dashboard', [DashboardController::class, 'index'])->name('Dashboard');
    Route::post('/Dashboard', [DashboardController::class, 'store'])->name('balances.store');
    // Route::post('/Dashboard', [DashboardController::class, 'edit'])->name('EditBalance');
    // Route::put('/Dashboard', [DashboardController::class, 'update'])->name('balances.update');

    // Expenses
    Route::get('/Expenses', [ExpenseController::class, 'showExpense'])->name('Expenses');
    Route::get('/Expenses/AddExpense', [ExpenseController::class, 'addExpense'])->name('AddExpense');
    Route::post('/Expenses', [ExpenseController::class, 'storeExpense'])->name('add.expense');
    Route::get('/Expenses/{id}/EditExpense', [ExpenseController::class, 'edit'])->name('EditExpense');
    Route::put('/Expenses/{id}', [ExpenseController::class, 'editExpense'])->name('edit.expense');
    Route::delete('/Expenses/{id}', [ExpenseController::class, 'deleteExpense'])->name('delete.expense');

    // Profile
    Route::get('/Profile', [ProfileController::class, 'index'])->name('Profile');
    Route::post('/Profile', [ProfileController::class, 'updateCategories'])->name('category.update');

    Route::get('/History', function () {
        return Inertia::render('Core/History');
    })->name('History');

    // Route::get('/profile', [ProfileController::class, 'index'])->name('profile');
    // Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    // Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

});

require __DIR__.'/auth.php';
