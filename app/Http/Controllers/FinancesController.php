<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

use App\Models\LaserSession;
use App\Models\MicroneedlingSession;
use App\Models\GiftCard;
use App\Models\Package;
use App\Models\Outcome;

class FinancesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $month = $request->query('month', Carbon::now()->month);
        $year = $request->query('year', Carbon::now()->year);

        return Inertia::render('finances/index', [
            'month' => (int) $month,
            'year' => (int) $year,
            'incomeTotal' => self::getIncomeByPeriod($month, $year),
            'outcomeTotal' => self::getOutcomeByPeriod($month, $year),
        ]);
    }

    public function incomeByPeriod($month, $year)
    {
        return self::getIncomeByPeriod($month, $year);
    }

    private static function getIncomeByPeriod($month, $year)
    {
        $laserSessionsTotal = LaserSession::whereRaw('MONTH(date_hour) = ?', [$month])
            ->whereRaw('YEAR(date_hour) = ?', [$year])
            ->sum('price');

        $microneedlingSessionsTotal = MicroneedlingSession::whereRaw('MONTH(date_hour) = ?', [$month])
            ->whereRaw('YEAR(date_hour) = ?', [$year])
            ->sum('price');

        $giftcardTotal = GiftCard::whereRaw('MONTH(created_at) = ?', [$month])
            ->whereRaw('YEAR(created_at) = ?', [$year])
            ->sum('price');

        $packageTotal = Package::whereRaw('MONTH(created_at) = ?', [$month])
            ->whereRaw('YEAR(created_at) = ?', [$year])
            ->sum('package_price');

        return (float) ($laserSessionsTotal + $microneedlingSessionsTotal + $giftcardTotal + $packageTotal);
    }

    public function outcomeByPeriod($month, $year)
    {
        return self::getOutcomeByPeriod($month, $year);
    }

    private static function getOutcomeByPeriod($month, $year)
    {
        return (float) Outcome::whereRaw('MONTH(date) = ?', [$month])
            ->whereRaw('YEAR(date) = ?', [$year])
            ->sum('amount');
    }
}
