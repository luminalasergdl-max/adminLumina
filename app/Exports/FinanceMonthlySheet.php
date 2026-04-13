<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class FinanceMonthlySheet implements FromCollection, WithTitle, WithHeadings, ShouldAutoSize
{
    private $month;
    private $items;

    public function __construct($month, $items)
    {
        $this->month = $month;
        $this->items = $items;
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $data = collect($this->items)->sortBy('date');
        
        $totalIncome = 0;
        $totalExpenses = 0;

        $rows = $data->map(function ($item) use (&$totalIncome, &$totalExpenses) {
            $amount = $item['amount'];
            if ($item['type'] === 'Ingreso') {
                $totalIncome += $amount;
            } else {
                $totalExpenses += $amount;
                $amount = -$amount; // Show expenses as negative in amount column or just keeping it positive? Better keep positive but sum separately.
            }

            return [
                $item['date']->format('d/m/Y'),
                $item['description'],
                $item['category'],
                $item['type'],
                $item['amount']
            ];
        });

        // Add summary rows
        $rows->push(['']);
        $rows->push(['', '', '', 'TOTAL INGRESOS:', $totalIncome]);
        $rows->push(['', '', '', 'TOTAL EGRESOS:', $totalExpenses]);
        $rows->push(['', '', '', 'BALANCE NETO:', $totalIncome - $totalExpenses]);

        return $rows;
    }

    public function headings(): array
    {
        return [
            'Fecha',
            'Descripción',
            'Categoría',
            'Tipo',
            'Monto'
        ];
    }

    public function title(): string
    {
        return $this->month;
    }
}
