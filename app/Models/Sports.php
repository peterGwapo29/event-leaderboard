<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sports extends Model
{
    public $timestamps = false;
    protected $fillable = ['id', 'name', 'instructor'];
}
