<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

// Model
use App\Models\Category;
// use App\Models\UserCategory;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            // 'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'password' => ['required', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Atau bisa menggunakan kode dibawah
        // $defaultCategories = DB::table('categories')
        // ->select('id')
        // ->whereIn('id', range(1, 10))
        // ->get();

        // // Siapkan data untuk tabel user_categories
        // $preferences = $defaultCategories->map(function ($category) use ($user) {
        //     return [
        //         'user_id' => $user->id,
        //         'category_id' => $category->id,
        //     ];
        // })->toArray();

        // // Masukkan data ke tabel user_categories
        // DB::table('user_categories')->insert($preferences);

        $defaultCategories = Category::whereIn('id', range(1, 10))->pluck('id')->toArray();
        $user->categories()->attach($defaultCategories);

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('Dashboard', absolute: false));
    }
}
