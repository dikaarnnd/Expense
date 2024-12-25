<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Category extends Model
{
    use HasFactory;

    protected $fillable = ['emoji', 'name'];

    // Relation
    public function users()
    {
        return $this->belongsToMany(User::class, 'user_categories', 'user_id', 'category_id');
    }

}
