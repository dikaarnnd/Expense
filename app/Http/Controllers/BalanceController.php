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
        $data = $request->validate([
            'setBalance' => 'required|numeric',
            'plan_date' => 'required|in:monthly,custom',
            'start_date' => 'required_if:plan_date,custom|date',
            'end_date' => 'required_if:plan_date,custom|date|after:start_date',
        ]);

        $balance = Balance::where('user_id', auth()->id())->first();

        if ($balance) {
            // Jika balance sudah ada, lakukan update
            $balance->update([
                'setBalance' => $request->setBalance,
                'plan_date' => $request->plan_date,
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
            ]);
        } else {
            // Jika balance belum ada, buat baru
            Balance::create([
                'setBalance' => $request->setBalance,
                'plan_date' => $request->plan_date,
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
                'user_id' => auth()->id(),
            ]);
        }
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
