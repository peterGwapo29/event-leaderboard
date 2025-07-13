<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Event;
use Illuminate\Support\Facades\DB;

class EventsController extends Controller
{
    public function index(){
        $events = Event::all();
        return Inertia::render("Events/event", compact('events'));
    }

     public function create()
    {
        return Inertia::render("Events/create");
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string|max:255',
        ]);

        Event::create($request->all());
        return redirect()->route('events.index')->with('message', 'Events inserted successfully.');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string|max:255',
        ]);

        $updated = DB::table('events')
            ->where('id', $id)
            ->update([
                'id' => $request->input('id'),
                'name' => $request->input('name'),
                'description' => $request->input('description'),
                'category' => $request->input('category'),
            ]);

        if ($updated === 0) {
            return redirect()->route('events.index')->with('message', 'No changes made or event not found.');
        }

        return redirect()->route('events.index')->with('message', 'Events updated successfully.');
    }

    public function changeStatus(Request $request, $id){

        DB::table('events')
            ->where('id', $id)
            ->update([
                'status' => $request->input('status'),
            ]);

        return redirect()->route('events.index')->with('message', 'Event status change successfully');
    }

    public function destroy($id)
    {
        DB::table('events')->where('id', $id)->delete();
        return redirect()->route('events.index')->with('message', 'Event deleted successfully.');
    }
}
