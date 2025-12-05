<?php

namespace App\Http\Controllers\Report;

use App\Http\Controllers\Controller;

use Inertia\Inertia;

use App\Models\Customer;

use DB;

use Log;

class ReportsController extends Controller
{
    public function show()
    {
        $customersByGender = Customer::select(DB::raw("COALESCE(gender, 'null') AS gender"), DB::raw('COUNT(*) AS total'))->groupBy('gender')->get();

        $customersByZipCode = Customer::select(DB::raw("COALESCE(zip_code, 'null') AS zip_code"), DB::raw('COUNT(*) AS total'))->groupBy('zip_code')->orderBy('total', 'DESC')->get();

        return Inertia::render('reports/index', [
            'customersByGender'=> $customersByGender,
            'customersByZipCode'=> $customersByZipCode,
        ]);
    }
}