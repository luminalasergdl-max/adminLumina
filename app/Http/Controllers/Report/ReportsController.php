<?php

namespace App\Http\Controllers\Report;

use App\Http\Controllers\Controller;

use App\Models\GiftCard;
use Inertia\Inertia;

use App\Models\Customer;

use App\Models\LaserSession;
use App\Models\MicroneedlingSession;

use DB;

class ReportsController extends Controller
{
    public function show()
    {
        $customersByGender = Customer::select(DB::raw("COALESCE(gender, 'null') AS gender"), DB::raw('COUNT(*) AS total'))->groupBy('gender')->get();

        $customersByZipCode = Customer::select(DB::raw("COALESCE(zip_code, 'null') AS zip_code"), DB::raw('COUNT(*) AS total'))->groupBy('zip_code')->orderBy('total', 'DESC')->get();

        $currentMonth = date('n');
        $currentYear = date('Y');

        return Inertia::render('reports/index', [
            'customersByGender' => $customersByGender,
            'customersByZipCode' => $customersByZipCode,
            'currentMonthIncome' => ReportsController::getIncomeByPeriod($currentMonth, $currentYear)
        ]);
    }

    public function incomeByPeriod($month, $year)
    {
        $total = ReportsController::getIncomeByPeriod($month, $year);

        return $total;
    }

    private function getIncomeByPeriod($month, $year)
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

        return $laserSessionsTotal + $microneedlingSessionsTotal + $giftcardTotal;
    }
}