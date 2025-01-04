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

    public function updateProfile(Request $request)
    {
        $user = Auth::user();

        // Validasi input
        $validatedData = $request->validate([
            'name' => 'nullable|string|max:255',
            'email' => 'nullable|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8',
        ]);

        $updateData = [
            'name' => $validatedData['name'] ?? $user->name,
            'email' => $validatedData['email'] ?? $user->email,
        ];

        // Perbarui password jika perlu
        if (!empty($validatedData['password'])) {
            $updateData['password'] = Hash::make($validatedData['password']);
        }

        // Update data user
        $user->update($updateData);

        return redirect()->back()->with('success', 'Profile successfully updated!');
    }

    public function updateCategories(Request $request)
    {
        $user = auth()->user();
        $categories = $request->input('categories');

        // Sync the selected categories with the user
        $user->categories()->sync(collect($categories)->pluck('id'));

        return redirect()->back()->with('success', 'Categories successfully saved!');
    }

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
