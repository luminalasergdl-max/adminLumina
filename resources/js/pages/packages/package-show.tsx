import AppLayout from '@/layouts/app-layout';

import { Head } from '@inertiajs/react';

import {
    ItemGroup,
    Item,
    ItemContent,
    ItemDescription,
    ItemTitle,
} from "@/components/ui/item"

import { index as indexCustomers, show as showCustomers } from '@/routes/customers';
import { show as showLaserTreatment } from '@/routes/customers/laser_treatments';
import { show, destroy } from '@/routes/customers/laser_treatments/packages'

import { type BreadcrumbItem } from '@/types';

import { ExtendedCustomer } from '@/types/customer';
import { Package } from '@/types/package'
import { LaserTreatment } from '@/types/laser-treatment'

import { Trash2Icon, PencilIcon } from "lucide-react"

import {
    Button
} from "@/components/ui/button"

import { ButtonGroup } from "@/components/ui/button-group"

import { Link } from '@inertiajs/react'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { format } from 'date-fns';

type PackageShowProps = {
    customer: ExtendedCustomer
    package: Package
    laser_treatment: LaserTreatment
    package_index: number
}

export default function PackageShow({ customer, laser_treatment, package: packageData, package_index }: PackageShowProps) {
    const title = `Paquete ${format(new Date(packageData.created_at), 'dd/MM/yyyy')}`

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Clientes',
            href: indexCustomers().url,
        },
        {
            title: customer.full_name,
            href: showCustomers(customer.id).url,
        },
        {
            title: laser_treatment.brief_description,
            href: showLaserTreatment({ customer: customer.id, laser_treatment: laser_treatment.id }).url
        },
        {
            title,
            href: showLaserTreatment({ customer: customer.id, laser_treatment: laser_treatment.id }).url
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <ItemGroup className='m-8'>
                <Item variant="outline">
                    <ItemContent>
                        <div className='flex flex-row justify-between'>
                            <h2 className='text-xl md:text-3xl font-semibold'>
                                {title}
                            </h2>
                            <ButtonGroup>
                                <Button variant="outline" size="icon" asChild>
                                    <Link href={`/customers/${customer.id}/laser_treatments/${laser_treatment.id}/packages/${packageData.id}/edit`}><PencilIcon /></Link>
                                </Button>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="outline" size="icon"><Trash2Icon /></Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Confirmas que deseas borrar este paquete?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Esta acción eliminará el paquete y no puede ser deshecha...
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                            <AlertDialogAction asChild>
                                                <Link href={destroy({ customer: customer.id, laser_treatment: laser_treatment.id, package: packageData.id })}>Sí, borrar</Link>
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </ButtonGroup>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div>
                                <ItemTitle className='mt-4'>
                                    Nombre
                                </ItemTitle>
                                <ItemDescription>
                                    {packageData.package_name || '-'}
                                </ItemDescription>
                            </div>
                            <div>
                                <ItemTitle className='mt-4'>
                                    Precio
                                </ItemTitle>
                                <ItemDescription>
                                    {packageData.package_price || '-'}
                                </ItemDescription>
                            </div>
                            <div>
                                <ItemTitle className='mt-4'>
                                    Sesiones totales
                                </ItemTitle>
                                <ItemDescription>
                                    {packageData.package_sessions_total || '-'}
                                </ItemDescription>
                            </div>
                            <div>
                                <ItemTitle className='mt-4'>
                                    Sesiones usadas
                                </ItemTitle>
                                <ItemDescription>
                                    {packageData.package_sessions_used || '-'}
                                </ItemDescription>
                            </div>
                            <div className="md:col-span-2">
                                <ItemTitle className='mt-4'>
                                    Notas
                                </ItemTitle>
                                <ItemDescription className='line-clamp-none'>
                                    {packageData.notes || '-'}
                                </ItemDescription>
                            </div>
                        </div>
                    </ItemContent>
                </Item>
            </ItemGroup>
        </AppLayout>
    )
}
