<?php

namespace App\Exports;

use App\Models\Appointment;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;
use Illuminate\Support\Carbon;

class CalendarExport implements WithMultipleSheets
{
    /**
     * @return array
     */
    public function sheets(): array
    {
        $sheets = [];
        $appointments = Appointment::with('customer')
            ->orderBy('start_date')
            ->orderBy('start_time')
            ->get();

        $grouped = $appointments->filter(fn($a) => $a->start_date !== null)
            ->groupBy(function ($appointment) {
                return $appointment->start_date->format('Y-m');
            })->sortKeysDesc();

        foreach ($grouped as $month => $monthAppointments) {
            $date = Carbon::parse($month . '-01');
            $title = ucfirst($date->translatedFormat('F Y'));
            $sheets[] = new CalendarMonthlySheet($title, $monthAppointments);
        }

        return $sheets;
    }
}
