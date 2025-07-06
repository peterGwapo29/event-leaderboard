<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ParticipantsController extends Controller
{
    public function index() {
        return Inertia::render("Participants/participants");
    }
}
