<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

// Model
use App\Models\Balance;
use App\Models\Category;
use App\Models\UserCategory;
use App\Models\Expense;

class ProfileController extends Controller
{
    public function index(Request $request)
    {
        // Query untuk menampilkan setBalance ke Dashboard
        $userId = $request->user()->id;
        $setBalance = Balance::where('user_id', auth()->id())->value('setBalance');
        $user = auth()->user();
        // Ambil kategori yang dipilih user dari tabel user_categories
        $userCategories = $user->categories()->get();
        $categories = Category::all()->map(function ($category) {
            return [
                'id' => $category->id,
                'emoji' => $category->emoji,
                'name' => $category->name,
                'isChecked' => false, // Default state
            ];
        });

        return Inertia::render('Core/Profile', [
            'setBalance' => $setBalance,
            'categories' => $categories,
            'userCategories' => $userCategories,
        ]);
    }
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    public function storeBalance(Request $request)
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

    public function updateProfile(Request $request)
    {
        $user = Auth::user();
        // Validasi input
        $validatedData = $request->validate([
            'name' => 'nullable|string',
            'email' => 'nullable|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8',
        ]);

        $updateData = [
            'name' => $validatedData['name'] ?? $user->name,
            'email' => $validatedData['email'] ?? $user->email,
            'password' => Hash::make($validatedData['password']),
        ];
    
        $user->update($updateData);

        return redirect()->route('Profile')->with('success', 'Profile successfully updated!');
    }

    public function updateBalance(Request $request)
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

    public function updateCategories(Request $request)
    {
        $user = auth()->user();
        $categories = $request->input('categories');

        // Sync the selected categories with the user
        $user->categories()->sync(collect($categories)->pluck('id'));

        return redirect()->route('Profile')->with('success', 'Categories successfully saved!');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
