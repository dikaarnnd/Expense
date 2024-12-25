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

// Model
use App\Models\Balance;
use App\Models\Category;
use App\Models\UserCategory;

class ProfileController extends Controller
{
    public function index()
    {
        // Query untuk menampilkan setBalance ke Dashboard
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
            'setBalance' => $setBalance, // Kirim hanya 'setBalance'
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

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
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
