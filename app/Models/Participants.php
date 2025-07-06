<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Participants extends Model
{
    protected $fillable = ['student_id', 'first_name', 'last_name', 'middle_name', 'course', 'year_level'];
}
