<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

//use App\Http\Controllers\Client\ClientController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\LaserTreatmentController;
use App\Http\Controllers\LaserSessionController;

use App\Http\Controllers\MicroneedlingTreatmentController;
use App\Http\Controllers\MicroneedlingSessionController;

use App\Http\Controllers\Report\ReportsController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/', function () {
        return redirect('/customers');
    })->name('home');

    Route::get('dashboard', function () {
        return redirect('/customers');
    })->name('dashboard');

    Route::get('reports', [ReportsController::class, 'show']);

    Route::resource('customers', CustomerController::class);

    Route::resource('customers.laser_treatments', LaserTreatmentController::class);

    Route::resource('customers.laser_treatments.laser_sessions', LaserSessionController::class);

    Route::resource('customers.microneedling_treatments', MicroneedlingTreatmentController::class);

    Route::resource('customers.microneedling_treatments.microneedling_sessions', MicroneedlingSessionController::class);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
