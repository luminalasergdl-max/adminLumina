import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { customers, finances, calendar, exportMethod } from '@/routes/exports';

import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Backups / exportables',
        href: exportMethod().url,
    },
];

export default function Exports() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Backups / exportables" />
            <div className="p-4 space-y-6 flex flex-col items-start">
                <h2 className='text-xl md:text-3xl font-semibold'>
                    Exportar información
                </h2>
                <a
                    href={customers.url()}
                >
                    <Button>Exportar información de clientes</Button>
                </a>
                <a
                    href={finances.url()}
                >
                    <Button>Exportar finanzas mensuales</Button>
                </a>
                <a
                    href={calendar.url()}
                >
                    <Button>Exportar agenda mensual</Button>
                </a>

                <h3 className='text-bold text-lg'>
                    Pasos a seguir para ver en Google Sheets:
                </h3>
                <ol className='list-decimal list-inside text-muted-foreground'>
                    <li>Descarga el archivo</li>
                    <li>Abre Google Sheets</li>
                    <li>Crea una nueva hoja en blanco</li>
                    <li>Ve a Archivo &gt; Importar</li>
                    <li>Selecciona la pestaña "Subir"</li>
                    <li>Arrastra y suelta el archivo descargado</li>
                    <li>Selecciona "Reemplazar hoja actual" o "Insertar hoja"</li>
                    <li>Haz clic en "Importar datos"</li>
                </ol>

                <span className='text-yellow-500'>Recomendable hacer esto desde una computadora!</span>
            </div>
        </AppLayout >

    )
}