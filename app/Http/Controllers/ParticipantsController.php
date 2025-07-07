<?php

namespace App\Http\Controllers;

use App\Models\Participants;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class ParticipantsController extends Controller
{
    public function index() {
        $participants = Participants::all();
        return Inertia::render("Participants/participants", compact('participants'));
    }

    public function create(){
        return Inertia::render("Participants/create");
    }

    public function store(Request $request){
        $request->validate([
            'student_id' => 'required|string|max:255',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'middle_name' => 'required|string|max:255',
            'course' => 'required|string|max:255',
            'year_level' => 'required|integer|max:255',
        ]);

        Participants::create($request->all());
        return redirect()->route('participants.index')->with('message', 'Participants inserted successfully.');
    }
    public function destroy($student_id) {
        DB::table('participants')->where('student_id', $student_id)->delete();
        return redirect()->route('participants.index')->with('message', 'Participants deleted successfully.');
    }
}
