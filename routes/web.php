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

use App\Http\Controllers\PackageController;
use App\Http\Controllers\OutcomesController;
use App\Http\Controllers\FinancesController;
use App\Http\Controllers\IncomesController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AppointmentController;

use Laravel\Socialite\Socialite;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/', function () {
        return redirect('/calendar');
    })->name('home');

    Route::get('dashboard', function () {
        return redirect('/calendar');
    })->name('dashboard');

    Route::get('reports', [ReportsController::class, 'show']);

    Route::get('incomeByPeriod/{month}/{year}', [ReportsController::class, 'incomeByPeriod']);

    Route::get('newCustomersByPeriod/{month}/{year}', [ReportsController::class, 'newCustomersByPeriod']);

    Route::resource('customers', CustomerController::class);

    Route::resource('customers.laser_treatments', LaserTreatmentController::class);

    Route::patch('markAsFinished/{laserTreatmentId}/{customerId}', [LaserTreatmentController::class, 'markAsFinished']);

    Route::resource('customers.laser_treatments.laser_sessions', LaserSessionController::class);

    Route::resource('customers.laser_treatments.packages', PackageController::class);

    Route::resource('customers.microneedling_treatments', MicroneedlingTreatmentController::class);

    Route::resource('customers.microneedling_treatments.microneedling_sessions', MicroneedlingSessionController::class);

    Route::resource('gift_card_campaign', GiftCardCampaignController::class)->except(['destroy']);

    Route::resource('gift_card', GiftCardController::class);

    Route::patch('markAsUsed/{giftCardId}', [GiftCardController::class, 'markAsUsed']);

    Route::resource('outcomes', OutcomesController::class);

    Route::resource('finances', FinancesController::class);

    Route::resource('incomes', IncomesController::class);

    Route::resource('suppliers', SupplierController::class);

    Route::resource('products', ProductController::class);

    Route::resource('appointments', AppointmentController::class);

    Route::get('pricing-calculator', function () {
        return Inertia::render('pricing-calculator/index');
    })->name('pricing-calculator');

    Route::get('calendar', [AppointmentController::class, 'index'])->name('index');
});

//Google Calendar OAuth
Route::get('/auth/redirect', function () {
    return Socialite::driver('google')
        ->scopes(['https://www.googleapis.com/auth/calendar'])
        ->with([
            'prompt' => 'consent',
        ])
        ->redirect();
});

Route::get('/auth/callback', function () {
    $googleUser = Socialite::driver('google')->user();

    Storage::disk('local')->put('google/oauth-token.json', $googleUser->token);
    if ($googleUser->refreshToken) {
        Storage::disk('local')->put('google/oauth-refresh-token.json', $googleUser->refreshToken);
    }

    $expiresIn = $googleUser->expiresIn;

    //Auth::login($user);
    return redirect('/calendar');
});

Route::get('/auth/refresh', function () {
    $refreshToken = Storage::disk('local')->get('google/oauth-refresh-token.json');

    $newTokens = Socialite::driver('google')->refreshToken($refreshToken);

    if ($newTokens->token) {
        Storage::disk('local')->put('google/oauth-token.json', $newTokens->token);
    }

    if ($newTokens->refreshToken) {
        Storage::disk('local')->put('google/oauth-refresh-token.json', $newTokens->refreshToken);
    }

    return redirect('/gmail');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
