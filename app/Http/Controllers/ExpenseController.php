<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Log;

// Model
use App\Models\UserCategory;
use App\Models\Expense;

class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        // Ambil kategori yang dipilih user dari tabel user_categories
        $userCategories = $user->categories()->get();
        return Inertia::render('Core/AddExpense', [
            'userCategories' => $userCategories,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $expenseData = $request->validate([
            'price' => 'required|numeric',
            'category_id' => 'required|exists:categories,id',
            'notes' => 'required|string',
            'buyDate' => 'required|date',
        ]);
        // Log::info('Input data for expense:', $request->all());
    
        $expense = Expense::create([
            'user_id' => auth()->id(),
            'price' => $request->price,
            'category_id' => $request->category_id,
            'notes' => $request->notes,
            'buyDate' => $request->buyDate,
        ]);
    
        return redirect()->route('Expenses')->with('success', 'Expense added successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
