<?php

namespace App\Http\Controllers;

use App\Models\Participants;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class ParticipantsController extends Controller
{
    public function index()
    {
        $participants = Participants::all();
        return Inertia::render("Participants/participants", compact('participants'));
    }

    public function create()
    {
        return Inertia::render("Participants/create");
    }

    public function store(Request $request)
    {
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

    public function update(Request $request, $student_id)
    {
        $request->validate([
            'student_id' => 'required|string|max:255',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'middle_name' => 'required|string|max:255',
            'course' => 'required|string|max:255',
            'year_level' => 'required|integer|max:255',
        ]);

        $updated = DB::table('participants')
            ->where('student_id', $student_id)
            ->update([
                'student_id' => $request->input('student_id'),
                'first_name' => $request->input('first_name'),
                'last_name' => $request->input('last_name'),
                'middle_name' => $request->input('middle_name'),
                'course' => $request->input('course'),
                'year_level' => $request->input('year_level'),
            ]);

        if ($updated === 0) {
            return redirect()->route('participants.index')->with('message', 'No changes made or participant not found.');
        }

        return redirect()->route('participants.index')->with('message', 'Participants updated successfully.');
    }

    public function destroy($student_id)
    {
        DB::table('participants')->where('student_id', $student_id)->delete();
        return redirect()->route('participants.index')->with('message', 'Participants deleted successfully.');
    }
}
