<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

// Model
use App\Models\Balance;
use App\Models\Expense;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $setBalance = Balance::where('user_id', auth()->id())->value('setBalance');
        
        // Ambil data expenses berdasarkan user_id
        $userId = $request->user()->id;
        $query = Expense::where('user_id', $userId)
            ->join('categories', 'expenses.category_id', '=', 'categories.id')
            ->select(
                'expenses.expense_id as id',
                'categories.id as category_id',
                'categories.name as category',
                'categories.emoji as emoji',
                'expenses.price as amount',
                'expenses.buyDate as date',
                'expenses.notes'
            );
        $expense = $query->orderBy('expenses.expense_id', 'desc')->take(5)->get();

        // Hitung total semua expenses untuk user tertentu
        $totalExpenses = Expense::where('user_id', $userId)->sum('price');

        // Hitung sisa saldo (balance - totalExpenses)
        $remainingBalance = $setBalance - $totalExpenses;

        return Inertia::render('Core/Dashboard', [
            'setBalance' => $setBalance, // Kirim hanya 'setBalance'
            'expense' => $expense,
            'totalExpenses' => $totalExpenses,
            'remainingBalance' => $remainingBalance,
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
        $data = $request->validate([
            'setBalance' => 'required|numeric',
            'plan_date' => 'required|in:monthly,custom',
            'start_date' => 'required_if:plan_date,custom|date',
            'end_date' => 'required_if:plan_date,custom|date|after:start_date',
        ]);

        Balance::create([
            'setBalance' => $request->setBalance,
            'plan_date' => $request->plan_date,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'user_id' => auth()->id(),
        ]);
        return redirect()->route('Dashboard')->with('success', 'Balance successfully saved!');
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
        $balance = Balance::findOrFail($id);

        $validated = $request->validate([
            'setBalance' => 'required|numeric|min:0',
            'plan_date' => 'nullable|string',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ]);

        $balance->update($validated);

        return response()->json([
            'message' => 'Balance successfully updated!',
            'data' => $balance,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
