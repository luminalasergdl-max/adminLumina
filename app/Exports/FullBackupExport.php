<?php

namespace App\Exports;

use App\Models\Customer;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class FullBackupExport implements WithMultipleSheets
{
    /**
     * @return array
     */
    public function sheets(): array
    {
        $sheets = [];
        // Eager load everything to avoid N+1 problems
        $customers = Customer::with([
            'laserTreatments.category', 
            'laserTreatments.laserSessions', 
            'laserTreatments.packages', 
            'microneedlingTreatments.microneedlingSessions'
        ])->get();

        foreach ($customers as $customer) {
            $sheets[] = new CustomerSheet($customer);
        }

        return $sheets;
    }
}
