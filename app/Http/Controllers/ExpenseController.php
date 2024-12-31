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
use App\Models\Category;
use App\Models\Expense;

class ExpenseController extends Controller
{
    public function showExpense(Request $request)
    {
        $userId = $request->user()->id;
        $filterCategory = $request->query('category_id', 'All');
        $categories = Category::select('id', 'name', 'emoji')->get();

        // Ambil data expenses berdasarkan user_id
        $query = Expense::where('user_id', $userId)
            ->join('categories', 'expenses.category_id', '=', 'categories.id')
            ->select(
                'expenses.expense_id as id',
                'categories.id as category_id', // Tambahkan id kategori untuk filter frontend
                'categories.name as category',
                'categories.emoji as emoji',
                'expenses.price as amount',
                'expenses.buyDate as date',
                'expenses.notes'
            );
            // ->orderBy('expenses.buyDate', 'desc')
            // ->get();
        
        //  filter berdasarkan category_id
        if ($filterCategory !== 'All') {
            $query->where('categories.id', $filterCategory);
        }

        $expenses = $query->orderBy('expenses.buyDate', 'desc')->get();

        return Inertia::render('Core/Expenses', [
            'expenses' => $expenses,
            'categories' => $categories, // Kirim kategori
            'filterCategory' => $filterCategory, // Kirim filter kategori
        ]);
    }

    public function addExpense()
    {
        $user = auth()->user();
        // Ambil kategori yang dipilih user dari tabel user_categories
        $userCategories = $user->categories()->get();
        return Inertia::render('Core/AddExpense', [
            'userCategories' => $userCategories,
        ]);
    }

    public function storeExpense(Request $request)
    {
        $expenseData = $request->validate([
            'price' => 'required|numeric',
            'category_id' => 'required|exists:categories,id',
            'notes' => 'required|string',
            'buyDate' => 'required|date',
        ]);
    
        $expense = Expense::create([
            'user_id' => auth()->id(),
            'price' => $request->price,
            'category_id' => $request->category_id,
            'notes' => $request->notes,
            'buyDate' => $request->buyDate,
        ]);
    
        return redirect()->route('Dashboard')->with('success', 'Expense added successfully!');
    }

    public function edit($id)
    {
        $user = auth()->user();
        // Ambil data expense berdasarkan ID
        $expense = Expense::find($id);

        // Ambil data kategori untuk dropdown
        $userCategories = $user->categories()->get();

        // Mengirim data expense dan kategori ke view
        return inertia('Core/EditExpense', [
            'expense' => $expense,
            'userCategories' => $userCategories,
        ]);
    }

    public function editExpense(Request $request, $id)
    {
        $expense = Expense::find($id);
        $validatedData = $request->validate([
            'price' => 'required|numeric|min:0',
            'category_id' => 'required|exists:categories,id',
            'notes' => 'nullable|string',
            'buyDate' => 'required|date',
        ]);

        $expense->update([
            'user_id' => auth()->id(),
            'price' => $validatedData['price'],
            'category_id' => $validatedData['category_id'],
            'notes' => $validatedData['notes'],
            'buyDate' => $validatedData['buyDate'],
        ]);

        return redirect()->route('Expenses')->with('success', 'Expense updated successfully!');
    }

    public function deleteExpense(string $id)
    {
        // Cari expense berdasarkan ID
        $expense = Expense::find($id);

        // Hapus expense
        $expense->delete();

        return redirect()->route('Expenses')->with('success', 'Expense deleted successfully!');
    }
}
