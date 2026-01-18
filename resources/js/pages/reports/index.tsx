import AppLayout from '@/layouts/app-layout';

import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

import { CustomersByGender } from './customers-by-gender';
import { CustomersByZipCode } from './customers-by-zip-code';
import { MonthlyIncome } from './monthly-income';

import { GenderTotal, ZipCodeTotal } from '@/types/reports';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Reportes',
        href: '',
    },
];

type ReportsProps = {
    customersByGender: GenderTotal[]
    customersByZipCode: ZipCodeTotal[]
    currentMonthIncome: number
}

export default function Reports({ customersByGender, customersByZipCode, currentMonthIncome }: ReportsProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Reportes" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                    <CustomersByGender customersByGender={customersByGender} />
                    <CustomersByZipCode customersByZipCode={customersByZipCode} />
                    <MonthlyIncome currentMonthIncome={currentMonthIncome} />
                </div>
            </div>

        </AppLayout>
    );
}
