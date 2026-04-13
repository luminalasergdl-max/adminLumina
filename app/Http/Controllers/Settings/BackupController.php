<?php

namespace App\Http\Controllers\Settings;
use App\Http\Controllers\Controller;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\FullBackupExport;
use App\Exports\FinanceExport;
use App\Exports\CalendarExport;


class BackupController extends Controller
{
    public function export()
    {
        return Excel::download(new FullBackupExport, 'backup_customers_' . date('Y-m-d') . '.xlsx');
    }

    public function finances()
    {
        return Excel::download(new FinanceExport, 'reporte_finanzas_' . date('Y-m-d') . '.xlsx');
    }

    public function calendar()
    {
        return Excel::download(new CalendarExport, 'reporte_calendario_' . date('Y-m-d') . '.xlsx');
    }

}
