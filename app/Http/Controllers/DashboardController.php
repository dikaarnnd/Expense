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

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $setBalance = Balance::where('user_id', auth()->id())->value('setBalance');
        
        // Recent Expense
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
        $expense = $query
        ->orderBy('expenses.buyDate', 'desc')
        ->orderBy('expenses.expense_id', 'desc')
        ->take(5)->get();

        // Total Expense
        $totalExpenses = Expense::where('user_id', $userId)->sum('price');

        // Total Cash Flow
        $remainingBalance = $setBalance - $totalExpenses;

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


        return Inertia::render('Core/Dashboard', [
            'setBalance' => $setBalance,
            'expense' => $expense,
            'totalExpenses' => $totalExpenses,
            'remainingBalance' => $remainingBalance,
            'categoriesUsage' => $categoriesUsage,
            'dailyExpense' => $dailyExpense,
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
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
