<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sports;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class SportsController extends Controller
{
    public function index() {
        $sports = Sports::all();
        return Inertia::render("Sports/sports", compact('sports'));
    }

    public function create()
    {
        return Inertia::render("Sports/create");
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'instructor' => 'required|string|max:255',
        ]);

        Sports::create($request->all());
        return redirect()->route('sports.index')->with('message', 'Sports inserted successfully.');
    }
}
