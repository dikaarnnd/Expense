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

class ProfileController extends Controller
{
    public function index()
    {
        // Query untuk menampilkan setBalance ke Dashboard
        $setBalance = Balance::where('user_id', auth()->id())->value('setBalance');

        // logger()->info('User setBalance:', ['setBalance' => $setBalance]);

        return Inertia::render('Core/Profile', [
            'setBalance' => $setBalance, // Kirim hanya 'setBalance'
        ]);

        // Ambil semua kategori dari database
        // $categories = Category::all();
        // $selectedCategories = auth()->user()->selected_categories;

        $categories = Category::all()->map(function ($category) {
            $category->isChecked = $category->id <= 10; // Default centang untuk ID 1-10
            return $category;
        });

        // Kirim data ke React melalui Inertia
        return Inertia::render('Core/Profile', [
            'categories' => $categories,
        ]);
        // return Inertia::render('Core/Profile', [
        //     'categories' => $categories, // Kirim data kategori
        //     'selectedCategories' => $selectedCategories ?? [], // Preferensi kategori (default: array kosong)
        // ]);
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
        $user->selected_categories = $request->input('selected_categories');
        $user->save();

        return redirect()->back()->with('success', 'Preferences updated!');
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
