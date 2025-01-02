<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Balance extends Model
{
    // Relation
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
    public function expenses()
    {
        return $this->hasMany(Expense::class, 'blc_id', 'id');
    }
    use HasFactory;
    protected $table = 'balances'; // Nama tabel dalam database
    protected $fillable = [
        'setBalance',
        'plan_date',
        'start_date',
        'end_date',
        'user_id',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'setBalance' => 'float',
        'start_date' => 'date',
        'end_date' => 'date',
    ];

}
