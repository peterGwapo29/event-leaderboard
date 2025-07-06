<?php

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

     Route::get('/participants', [ParticipantsController::class, 'index'])->name('participants.index');
     Route::post('/participants', [ParticipantsController::class, 'store'])->name('participants.store');
     Route::get('/participants/create', [ParticipantsController::class, 'create'])->name('participants.create');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
