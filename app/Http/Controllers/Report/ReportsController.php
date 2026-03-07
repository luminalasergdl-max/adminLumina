<?php

namespace App\Http\Controllers\Report;

use App\Http\Controllers\Controller;

use App\Models\GiftCard;
use Inertia\Inertia;

use App\Models\Customer;

use App\Models\LaserSession;
use App\Models\MicroneedlingSession;
use App\Models\Package;
use App\Models\LaserTreatment;

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
            'newCustomersByPeriod' => self::newCustomersByPeriod($currentMonth, $currentYear),
            'customersByHowDidYouKnownAboutUs' => self::getCustomersByHowDidYouKnownAboutUs(),
            'laserTreatmentsByLaserCategory' => self::laserTreatmentsByLaserCategory()
        ]);
    }

    public function newCustomersByPeriod($month, $year)
    {
        $total = Customer::whereRaw('MONTH(created_at) = ?', [$month])
            ->whereRaw('YEAR(created_at) = ?', [$year])
            ->count();

        return $total;
    }

    public static function getCustomersByHowDidYouKnownAboutUs()
    {
        $totals = Customer::selectRaw('
                COALESCE(SUM(instagram), 0) as instagram,
                COALESCE(SUM(maps), 0) as maps,
                COALESCE(SUM(mouth_mouth), 0) as mouth_mouth,
                SUM(CASE WHEN other_hear_about_us IS NOT NULL AND other_hear_about_us != "" THEN 1 ELSE 0 END) as other
            ')->first();

        return [
            [
                'how_did_you_known_about_us' => 'Instagram',
                'total' => (int) $totals->instagram
            ],
            [
                'how_did_you_known_about_us' => 'Maps',
                'total' => (int) $totals->maps
            ],
            [
                'how_did_you_known_about_us' => 'Boca a boca',
                'total' => (int) $totals->mouth_mouth
            ],
            [
                'how_did_you_known_about_us' => 'Otro',
                'total' => (int) $totals->other
            ]
        ];
    }

    public static function laserTreatmentsByLaserCategory()
    {
        $laserTreatmentsByLaserCategory = LaserTreatment::select(
            DB::raw("COALESCE(laser_category.name, 'Sin Categoría') AS laser_category_name"),
            DB::raw('COUNT(laser_treatment.id) AS total')
        )
        ->leftJoin('laser_category', 'laser_treatment.laser_category_id', '=', 'laser_category.id')
        ->groupBy('laser_category.name')
        ->get();

        return $laserTreatmentsByLaserCategory;
    }
}