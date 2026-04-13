<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class CalendarMonthlySheet implements FromCollection, WithTitle, WithHeadings, ShouldAutoSize
{
    private $month;
    private $appointments;

    public function __construct($month, $appointments)
    {
        $this->month = $month;
        $this->appointments = $appointments;
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return $this->appointments->map(function ($appointment) {
            return [
                $appointment->start_date ? $appointment->start_date->format('d/m/Y') : 'N/A',
                $appointment->start_time,
                $appointment->end_time,
                $appointment->is_blocked ? 'BLOQUEADO' : ($appointment->customer->full_name ?? 'N/A'),
                $appointment->whatsapp_reminder_sent ? 'Sí' : 'No',
                $appointment->times_rescheduled,
            ];
        });
    }

    public function headings(): array
    {
        return [
            'Fecha',
            'Hora Inicio',
            'Hora Fin',
            'Cliente / Estado',
            'Recordatorio WhatsApp',
            'Veces Reagendada'
        ];
    }

    public function title(): string
    {
        return $this->month;
    }
}
