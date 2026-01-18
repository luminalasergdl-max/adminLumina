import AppLayout from '@/layouts/app-layout';

import { Head } from '@inertiajs/react';

import {
    ItemGroup,
    Item,
    ItemContent,
    ItemDescription,
    ItemTitle,
} from "@/components/ui/item"

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

import { ExtendedCustomer } from '@/types/customer';

import { MicroneedlingTreatment } from '@/types/microneedling-treatment';

import { type BreadcrumbItem } from '@/types';

import { Trash2Icon, PencilIcon } from "lucide-react"

type MicroneedlingTreatmentShowProps = {
    customer: ExtendedCustomer
    microneedling_treatment: MicroneedlingTreatment
    index: number
}

import { index as indexCustomers, show as showCustomers } from '@/routes/customers';

import { create as createMicroneedlingSession } from '@/routes/customers/microneedling_treatments/microneedling_sessions'

import { show, destroy } from '@/routes/customers/microneedling_treatments';
import { MicroneedlingSession } from '@/types/microneedling-session';

import { LuminaCarousel, CarouselElement } from '@/components/lumina-carousel/lumina-carousel';
import { MicroneedlingTreatmentShowMicroneedlingSessionsTable } from './microneedling-treatment-show-microneedling-sessions-table';

export default function MicroneedlingTreatmentShow({ customer, microneedling_treatment, index }: MicroneedlingTreatmentShowProps) {
    const title = microneedling_treatment.objective

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
            href: show({ customer: customer.id, microneedling_treatment: microneedling_treatment.id }).url
        },
    ];

    let imagesList = generateImages(microneedling_treatment, 'Foto Inicial')

    imagesList.push(...microneedling_treatment.microneedling_sessions?.map((session, index) => generateImages(session, `Foto de sesión ${index + 1}: `)).flat())

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <ItemGroup className='m-8'>
                <Item variant="outline">
                    <ItemContent>
                        <div className='flex flex-row justify-between'>
                            <h2 className='text-xl md:text-3xl font-semibold'>
                                {microneedling_treatment.objective}
                            </h2>
                            <ButtonGroup>
                                <Button variant="outline" size="icon" asChild>
                                    <Link href={`/customers/${customer.id}/microneedling_treatments/${microneedling_treatment.id}/edit`}><PencilIcon /></Link>
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
                                                <Link href={destroy({ customer: customer.id, microneedling_treatment: microneedling_treatment.id })}>Sí, borrar</Link>
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </ButtonGroup>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div className="lg:block">
                                <ItemTitle className='mt-4'>
                                    Lugar anatómico
                                </ItemTitle>
                                <ItemDescription>
                                    {microneedling_treatment.anatomic_place || '-'}
                                </ItemDescription>
                            </div>
                            <div className="lg:block">
                                <ItemTitle className='mt-4'>
                                    Activo
                                </ItemTitle>
                                <ItemDescription>
                                    {microneedling_treatment.activo || '-'}
                                </ItemDescription>
                            </div>
                            <div className="lg:block">
                                <ItemTitle className='mt-4'>
                                    Notas
                                </ItemTitle>
                                <ItemDescription className='line-clamp-none'>
                                    {microneedling_treatment.notes || '-'}
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
                        href={createMicroneedlingSession([customer, microneedling_treatment.id]).url}
                        method={createMicroneedlingSession([customer.id, microneedling_treatment.id]).method}
                        as="button"
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 has-[>svg]:px-3"
                    >
                        Nueva Sesión
                    </Link>
                </div>
                <MicroneedlingTreatmentShowMicroneedlingSessionsTable
                    customer={customer}
                    microneedlingTreatment={microneedling_treatment}
                />
            </div>
            <div className='m-8'>
                <div className="flex justify-between gap-16 sm:gap-2">
                    <h2 className='text-xl md:text-3xl font-semibold'>
                        Galería
                    </h2>
                </div>
                <LuminaCarousel imagesList={imagesList} />
            </div>
        </AppLayout>
    )
}


function generateImages(source: MicroneedlingTreatment | MicroneedlingSession, description: string) {
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