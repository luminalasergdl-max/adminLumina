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

use App\Http\Controllers\GiftCardCampaignController;
use App\Http\Controllers\GiftCardController;

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

    Route::get('incomeByPeriod/{month}/{year}', [ReportsController::class, 'incomeByPeriod']);

    Route::resource('customers', CustomerController::class);

    Route::resource('customers.laser_treatments', LaserTreatmentController::class);

    Route::resource('customers.laser_treatments.laser_sessions', LaserSessionController::class);

    Route::resource('customers.microneedling_treatments', MicroneedlingTreatmentController::class);

    Route::resource('customers.microneedling_treatments.microneedling_sessions', MicroneedlingSessionController::class);

    Route::resource('gift_card_campaign', GiftCardCampaignController::class)->except(['destroy']);

    Route::resource('gift_card', GiftCardController::class);

    Route::patch('markAsUsed/{giftCardId}', [GiftCardController::class, 'markAsUsed']);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
