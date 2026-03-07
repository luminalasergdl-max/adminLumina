<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use App\Models\LaserSession;
use App\Models\MicroneedlingSession;
use App\Models\GiftCard;
use App\Models\Package;

class IncomesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $month = $request->query('month', Carbon::now()->month);
        $year = $request->query('year', Carbon::now()->year);

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

        $incomes = [
            [
                'id' => 'laserSession',
                'category' => 'laserSession',
                'amount' => (float) $laserSessionsTotal,
                'description' => 'Ingresos por Sesiones Láser',
            ],
            [
                'id' => 'microneedlingSession',
                'category' => 'microneedlingSession',
                'amount' => (float) $microneedlingSessionsTotal,
                'description' => 'Ingresos por Sesiones Microneedling',
            ],
            [
                'id' => 'giftCard',
                'category' => 'giftCard',
                'amount' => (float) $giftcardTotal,
                'description' => 'Ingresos por Venta de Tarjetas de Regalo',
            ],
            [
                'id' => 'package',
                'category' => 'package',
                'amount' => (float) $packageTotal,
                'description' => 'Ingresos por Venta de Paquetes',
            ]
        ];

        return Inertia::render('incomes/index', [
            'incomes' => $incomes,
            'month' => (int) $month,
            'year' => (int) $year,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
