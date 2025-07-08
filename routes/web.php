<?php

use App\Http\Controllers\EventsController;
use App\Http\Controllers\ParticipantsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    //Participants
    Route::get('/participants', [ParticipantsController::class, 'index'])->name('participants.index');
    Route::post('/participants', [ParticipantsController::class, 'store'])->name('participants.store');
    Route::get('/participants/create', [ParticipantsController::class, 'create'])->name('participants.create');
    Route::get('/participants/{student_id}/edit', [ParticipantsController::class, 'edit'])->name('participants.edit');
    Route::put('/participants/{student_id}', [ParticipantsController::class, 'update'])->name('participants.update');
    Route::delete('/participants/{student_id}', [ParticipantsController::class, 'destroy'])->name('participants.destroy');

    //Events
    Route::get('/events', [EventsController::class, 'index'])->name('events.index');
    Route::post('/events', [EventsController::class, 'store'])->name('events.store');
    Route::get('/events/create', [EventsController::class, 'create'])->name('events.create');
    Route::put('/events/{id}', [EventsController::class, 'changeStatus'])->name('events.changeStatus');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
