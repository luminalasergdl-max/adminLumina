<?php

namespace App\Exports;

use App\Models\LaserSession;
use App\Models\MicroneedlingSession;
use App\Models\Package;
use App\Models\GiftCard;
use App\Models\Outcome;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;
use Illuminate\Support\Collection;

class FinanceExport implements WithMultipleSheets
{
    /**
     * @return array
     */
    public function sheets(): array
    {
        $items = new Collection();

        // 1. Laser Sessions
        LaserSession::with('laserTreatment.customer')->get()->each(function ($session) use ($items) {
            $items->push([
                'date' => $session->date_hour,
                'description' => 'Sesión Láser - ' . ($session->laserTreatment->customer->full_name ?? 'N/A'),
                'category' => 'Tratamiento Láser',
                'type' => 'Ingreso',
                'amount' => $session->price,
            ]);
        });

        // 2. Microneedling Sessions
        MicroneedlingSession::with('microneedlingTreatment.customer')->get()->each(function ($session) use ($items) {
            $items->push([
                'date' => $session->date_hour,
                'description' => 'Sesión Microneedling - ' . ($session->microneedlingTreatment->customer->full_name ?? 'N/A'),
                'category' => 'Microneedling',
                'type' => 'Ingreso',
                'amount' => $session->price,
            ]);
        });

        // 3. Packages
        Package::with('laserTreatment.customer')->get()->each(function ($package) use ($items) {
            $items->push([
                'date' => $package->created_at,
                'description' => 'Paquete: ' . $package->package_name . ' - ' . ($package->laserTreatment->customer->full_name ?? 'N/A'),
                'category' => 'Venta de Paquete',
                'type' => 'Ingreso',
                'amount' => $package->package_price,
            ]);
        });

        // 4. Gift Cards
        GiftCard::all()->each(function ($card) use ($items) {
            $items->push([
                'date' => $card->created_at,
                'description' => 'Gift Card: ' . $card->sender . ' para ' . $card->receiver,
                'category' => 'Gift Card',
                'type' => 'Ingreso',
                'amount' => $card->price,
            ]);
        });

        // 5. Outcomes (Expenses)
        Outcome::all()->each(function ($outcome) use ($items) {
            $fieldName = $outcome->name ?? ($outcome->description ?? 'Gasto sin nombre');
            $items->push([
                'date' => $outcome->date ? \Illuminate\Support\Carbon::parse($outcome->date) : $outcome->created_at,
                'description' => $fieldName,
                'category' => $outcome->type ?? 'Gasto General',
                'type' => 'Egreso',
                'amount' => $outcome->amount,
            ]);
        });

        // Group by Year-Month
        $grouped = $items->filter(fn($item) => $item['date'] !== null)
            ->groupBy(function ($item) {
                return $item['date']->format('Y-m');
            })->sortKeysDesc();

        $sheets = [];
        foreach ($grouped as $month => $monthItems) {
            // Format month name for sheet title (e.g., "Mayo 2024")
            $date = \Illuminate\Support\Carbon::parse($month . '-01');
            $title = ucfirst($date->translatedFormat('F Y'));
            $sheets[] = new FinanceMonthlySheet($title, $monthItems);
        }

        return $sheets;
    }
}
