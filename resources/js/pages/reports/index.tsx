import AppLayout from '@/layouts/app-layout';

import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

import { CustomersByGender } from './customers-by-gender';
import { CustomersByZipCode } from './customers-by-zip-code';
import { CustomersByHowDidYouKnownAboutUs } from './customers-by-how-did-you-known-about-us';
import { NewCustomersByPeriod } from './new-customers-by-period';
import { LaserTreatmentByLaserCategory } from './laser-treatment-by-laser-category';
import { SessionsByPeriod } from './sessions-by-period';

import { GenderTotal, ZipCodeTotal, HowDidYouKnowAboutUsTotal, LaserTreatmentByLaserCategoryTotal } from '@/types/reports';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Reportes',
        href: '',
    },
];

type ReportsProps = {
    customersByGender: GenderTotal[]
    customersByZipCode: ZipCodeTotal[]
    customersByHowDidYouKnownAboutUs: HowDidYouKnowAboutUsTotal[]
    newCustomersByPeriod: number
    laserTreatmentsByLaserCategory: LaserTreatmentByLaserCategoryTotal[]
    sessionsByPeriod: number
}

export default function Reports({ customersByGender, customersByZipCode, customersByHowDidYouKnownAboutUs, newCustomersByPeriod, laserTreatmentsByLaserCategory, sessionsByPeriod }: ReportsProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Reportes" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                    <CustomersByGender customersByGender={customersByGender} />
                    <CustomersByHowDidYouKnownAboutUs customersByHowDidYouKnownAboutUs={customersByHowDidYouKnownAboutUs} />
                    <CustomersByZipCode customersByZipCode={customersByZipCode} />
                    <LaserTreatmentByLaserCategory laserTreatmentsByLaserCategory={laserTreatmentsByLaserCategory} />
                    <NewCustomersByPeriod newCustomersByPeriod={newCustomersByPeriod} />
                    <SessionsByPeriod sessionsByPeriod={sessionsByPeriod} />
                </div>
            </div>
        </AppLayout>
    );
}
