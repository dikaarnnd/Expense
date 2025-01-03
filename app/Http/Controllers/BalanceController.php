<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

// Model
use App\Models\Balance;

class BalanceController extends Controller
{
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
        return redirect()->back()->with('success', 'Balance successfully saved!');
    }

    public function update(Request $request)
    {
        // Validasi input
        $request->validate([
            'setBalance' => 'required|numeric|min:0',
            'plan_date' => 'nullable|in:monthly,custom',
            'start_date' => 'nullable|required_if:plan_date,custom|date',
            'end_date' => 'nullable|required_if:plan_date,custom|date|after:start_date',
        ]);

        // Ambil id balance berdasarkan user_id
        $balanceId = DB::table('balances')
        ->where('user_id', auth()->id())
        ->value('balance_id');

        // Jika balanceId ditemukan, lakukan update
        if ($balanceId) {
            $updateData = [
                'setBalance' => $request->input('setBalance'), // Update balance
            ];

            // Jika plan_date adalah 'custom', tambahkan start_date dan end_date ke update data
            if ($request->input('plan_date') === 'custom') {
                $updateData['start_date'] = $request->input('start_date');
                $updateData['end_date'] = $request->input('end_date');
            } 

            // Update ke database
            DB::table('balances')
                ->where('balance_id', $balanceId)
                ->update($updateData);

            return redirect()->back()->with('success', 'Balance updated successfully!');
        }
    }
}
