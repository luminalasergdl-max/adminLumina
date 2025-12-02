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
import { show, destroy } from '@/routes/customers/laser_treatments';

import { create as createLaserSession } from '@/routes/customers/laser_treatments/laser_sessions'

import { type BreadcrumbItem } from '@/types';

import { ExtendedCustomer } from '@/types/customer';
import { LaserCategory } from '@/types/laser-category'
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

import { LuminaCarousel, CarouselElement } from '@/components/lumina-carousel/lumina-carousel';

import { LaserTreatmentShowLaserSessionsTable } from './laser-treatment-show-laser-sessions-table'
import { LaserSession } from '@/types/laser-session';

type LaserTreatmentShowProps = {
    customer: ExtendedCustomer
    laser_categories: LaserCategory[]
    laser_treatment: LaserTreatment
    index: number
}

export default function LaserTreatmentShow({ customer, laser_treatment, laser_categories, index }: LaserTreatmentShowProps) {
    const title = laser_treatment.brief_description

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
            title,
            href: show({ customer: customer.id, laser_treatment: laser_treatment.id }).url
        },
    ];

    let imagesList = generateImages(laser_treatment, 'Foto Inicial')

    imagesList.push(...laser_treatment.laser_sessions?.map((session, index) => generateImages(session, `Foto de sesión ${index + 1}: `)).flat())

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <ItemGroup className='m-8'>
                <Item variant="outline">
                    <ItemContent>
                        <div className='flex flex-row justify-between'>
                            <h2 className='text-xl md:text-3xl font-semibold'>
                                {laser_treatment.brief_description}
                            </h2>
                            <ButtonGroup>
                                <Button variant="outline" size="icon" asChild>
                                    <Link href={`/customers/${customer.id}/laser_treatments/${laser_treatment.id}/edit`}><PencilIcon /></Link>
                                </Button>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="outline" size="icon"><Trash2Icon /></Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Confirmas que deseas borrar este tratamiento?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Esta acción eliminará todas las sesiones e imagenes relacionadas a este tratamiento y no puede ser deshecha...
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                            <AlertDialogAction asChild>
                                                <Link href={destroy({ customer: customer.id, laser_treatment: laser_treatment.id })}>Sí, borrar</Link>
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </ButtonGroup>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4">
                            <div>
                                <ItemTitle className='mt-4'>
                                    Categoría
                                </ItemTitle>
                                <ItemDescription>
                                    {laser_categories.find((laserCategory) => (laserCategory.id === laser_treatment.laser_category_id))?.name || '-'}
                                </ItemDescription>
                            </div>
                            <div className="lg:block">
                                <ItemTitle className='mt-4'>
                                    Lugar anatómico
                                </ItemTitle>
                                <ItemDescription>
                                    {laser_treatment.anatomic_place || '-'}
                                </ItemDescription>
                            </div>
                            <div className="lg:block">
                                <ItemTitle className='mt-4'>
                                    Tamaño
                                </ItemTitle>
                                <ItemDescription>
                                    {laser_treatment.size || '-'}
                                </ItemDescription>
                            </div>
                            <div className="lg:block">
                                <ItemTitle className='mt-4'>
                                    Antiguëdad (en años)
                                </ItemTitle>
                                <ItemDescription>
                                    {laser_treatment.years || '-'}
                                </ItemDescription>
                            </div>
                            <div className="lg:block">
                                <ItemTitle className='mt-4'>
                                    Número de retoques
                                </ItemTitle>
                                <ItemDescription>
                                    {laser_treatment.retouching || '-'}
                                </ItemDescription>
                            </div>
                            <div className="lg:block">
                                <ItemTitle className='mt-4'>
                                    Notas
                                </ItemTitle>
                                <ItemDescription>
                                    {laser_treatment.notes || '-'}
                                </ItemDescription>
                            </div>
                        </div>
                    </ItemContent>
                </Item>
            </ItemGroup>
            <div className='m-8'>
                <div className="flex justify-between  gap-16 sm:gap-2">
                    <h2 className='text-xl md:text-3xl font-semibold'>
                        Sesiones
                    </h2>
                    <Link
                        href={createLaserSession([customer, laser_treatment.id]).url}
                        method={createLaserSession([customer.id, laser_treatment.id]).method}
                        as="button"
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 has-[>svg]:px-3"
                    >
                        Nueva Sesión
                    </Link>
                </div>
                <LaserTreatmentShowLaserSessionsTable
                    customer={customer}
                    laserTreatment={laser_treatment}
                />
            </div>
            <div className='m-8'>
                <div className="flex justify-between  gap-16 sm:gap-2">
                    <h2 className='text-xl md:text-3xl font-semibold'>
                        Galería
                    </h2>
                </div>
                <LuminaCarousel imagesList={imagesList} />
            </div>
        </AppLayout>
    )
}

function generateImages(source: LaserTreatment | LaserSession, description: string) {
    return [0, 1, 2].reduce((prevArray, index) => {
        // @ts-expect-error
        const photoField: keyof typeof source = `photo_${index}`
        if (source[photoField]) {
            prevArray.push(
                {
                    description: `${description} ${index + 1}`,
                    // @ts-expect-error
                    url: source[photoField]
                })
        }
        return prevArray
    }, [] as CarouselElement[])
}