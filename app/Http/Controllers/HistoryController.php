<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;

// Model
use App\Models\Balance;
use App\Models\Expense;
use App\Models\Category;

class HistoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // ID user
        $userId = $request->user()->id;

        // Balance user
        $setBalance = Balance::where('user_id', auth()->id())->value('setBalance');

        // Total Expense
        $totalExpenses = Expense::where('user_id', $userId)->sum('price');

        // Total Cash Flow
        $remainingBalance = $setBalance - $totalExpenses;

        // Categories
        $category = Category::all()->map(function ($category) {
            return [
                'id' => $category->id,
                'emoji' => $category->emoji,
                'name' => $category->name,
                'isChecked' => false, // Default state
            ];
        });

        // Top Categories
        $categoriesUsage = Expense::where('expenses.user_id', $userId)
        ->join('categories', 'expenses.category_id', '=', 'categories.id')
        ->select(
            'categories.id as category_id',
            'categories.name as name',
            'categories.emoji as emoji',
            DB::raw('COUNT(expenses.expense_id) as expenses_count'),
            DB::raw('SUM(expenses.price) as total_amount')
        )->groupBy('categories.id', 'categories.name', 'categories.emoji')
        ->orderBy('total_amount', 'desc')
        ->get()->toArray();
        
        // Pengurutan kategori dari nomor 1
        $categoriesUsage = array_map(function ($category, $index) {
            $category['row_number'] = $index + 1;
            return $category;
        }, $categoriesUsage, array_keys($categoriesUsage));

        // Chart
        $dailyExpense = Expense::where('expenses.user_id', $userId)
        ->join('categories', 'expenses.category_id', '=', 'categories.id')
        ->whereBetween('expenses.buyDate', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])
        ->select(
            DB::raw('DATE_FORMAT(expenses.buyDate, "%W") as day'), // Konversi tanggal ke hari
            DB::raw('SUM(expenses.price) as total_amount'),
            DB::raw('COUNT(expenses.expense_id) as expenses_count')
        )
        ->groupBy('day')
        ->orderByRaw("FIELD(day, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')")
        ->get();

        return Inertia::render('Core/History', [
            'setBalance' => $setBalance,
            'totalExpenses' => $totalExpenses,
            'remainingBalance' => $remainingBalance,
            'categoriesUsage' => $categoriesUsage,
            'dailyExpense' => $dailyExpense,
            'category' => $category,
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
        //
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
