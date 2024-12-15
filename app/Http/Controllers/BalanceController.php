<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BalanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        // Validasi inputan
        $validated = $request->validate([
            'setBalance' => 'required|numeric', // Validasi setBalance
            'plan_date' => 'required|in:monthly,custom', // Validasi plan_date
            'start_date' => 'required|date', // Validasi start_date
            'end_date' => 'required|date|after:start_date', // Validasi end_date setelah start_date
        ]);

        // Menambahkan balance ke dalam database
        // Balance::create([
        //     'setBalance' => $request->balance,
        //     'plan_date' => $request->plan_date,
        //     'start_date' => $request->start_date,
        //     'end_date' => $request->end_date,
        //     'user_id' => auth()->id(),
        // ]);

        $balance = new Balance();
        $balance->balance = $validated['balance'];
        $balance->plan_date = $validated['plan_date'];
        $balance->start_date = $validated['start_date'];
        $balance->end_date = $validated['end_date'];
        $balance->save();

        // Mengembalikan respons ke frontend (dalam hal ini dengan status sukses)
        return redirect()->back()->with('success', 'Balance successfully added!');
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
