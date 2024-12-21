<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

// Model
use App\Models\Balance;

class BalanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Query untuk menampilkan setBalance ke Dashboard
        $setBalance = Balance::where('user_id', auth()->id())->value('setBalance');

        // logger()->info('User setBalance:', ['setBalance' => $setBalance]);

        return Inertia::render('Core/Dashboard', [
            'setBalance' => $setBalance, // Kirim hanya 'setBalance'
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
        // \Log::info($request->all());
        \Log::info('Request data: ' . json_encode($request->all()));


        $request->validate([
            'setBalance' => 'required|numeric',
            'plan_date' => 'required|in:monthly,custom',
            'start_date' => 'required_if:plan_date,custom|date',
            'end_date' => 'required_if:plan_date,custom|date|after:start_date',
            'user_id' => 'required|exists:users,id',
        ]);

        // $setBalance = floatval($request->setBalance);
    
        // Simpan data ke database
        // Balance::create([
        //     'setBalance' => $request->setBalance,
        //     'plan_date' => $request->plan_date,
        //     'start_date' => $request->start_date,
        //     'end_date' => $request->end_date,
        //     'user_id' => auth()->id(),
        // ]);
        Balance::create($request->all());
    
        // return redirect()->back()->with('success', 'Balance successfully saved!');
        // return redirect()->route('Dashboard')->with('success', 'Balance successfully saved!');
        return to_route('balance.index');

        
        // Validasi inputan
        // $request->validate([
        //     'setBalance' => 'required|numeric', // Validasi setBalance
        //     'plan_date' => 'required|in:monthly,custom', // Validasi plan_date
        //     'start_date' => 'required|date|required_if:plan_date,custom', // Validasi start_date
        //     'end_date' => 'required|date|after:start_date', // Validasi end_date setelah start_date
        // ]);

        // try {
        //     // Simpan data ke database
        //     Balance::updateOrCreate(
        //         ['user_id' => auth()->id()], // Kondisi: Update jika user_id sudah ada
        //         [
        //             'setBalance' => $request->setBalance,
        //             'plan_date' => $request->plan_date,
        //             'start_date' => $request->start_date,
        //             'end_date' => $request->end_date,
        //         ]
        //     );
    
        //     return response()->json(['message' => 'Balance successfully added!'], 200);
        // } catch (\Exception $e) {
        //     logger()->error('Failed to store balance:', ['error' => $e->getMessage()]);
        //     return response()->json(['message' => 'Failed to add balance. Please try again.'], 500);
        // }
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
        $balance = Balance::findOrFail($id);
        return Inertia::render('Core/EditBalance', [
            'balance' => $balance,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'setBalance' => 'required|numeric',
            'plan_date' => 'required|in:monthly,custom',
            'start_date' => 'nullable|date|required_if:plan_date,custom',
            'end_date' => 'required|date|after:start_date',
        ]);
    
        $balance = Balance::findOrFail($id);
        $balance->update([
            'setBalance' => $request->setBalance,
            'plan_date' => $request->plan_date,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
