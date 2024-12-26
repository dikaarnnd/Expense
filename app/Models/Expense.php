<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Expense extends Model
{
    use HasFactory;
    protected $primaryKey = 'expense_id';
    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'price',
        'category_id',
        'notes',
        'buyDate',
    ];

    // Relation
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
