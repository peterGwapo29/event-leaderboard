<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = ['id', 'name', 'description', 'category', 'start_time', 'end_time','status'];
}
