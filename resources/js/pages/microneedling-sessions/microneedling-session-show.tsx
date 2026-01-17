import { format } from "date-fns";

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
import { show as showMicroneedlingTreatment } from '@/routes/customers/microneedling_treatments';
import { show, destroy } from '@/routes/customers/microneedling_treatments/microneedling_sessions'

import { type BreadcrumbItem } from '@/types';

import { ExtendedCustomer } from '@/types/customer';
import { MicroneedlingSession } from '@/types/microneedling-session'
import { MicroneedlingTreatment } from '@/types/microneedling-treatment'

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

type MicroneedlingSessionShowProps = {
    customer: ExtendedCustomer
    microneedling_session: MicroneedlingSession
    microneedling_treatment: MicroneedlingTreatment
    session_index: number
}

export default function MicroneedlingSessionShow({ customer, microneedling_treatment, microneedling_session, session_index }: MicroneedlingSessionShowProps) {
    const title = `Sesión ${session_index}`

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
            title: microneedling_treatment.objective,
            href: showMicroneedlingTreatment({ customer: customer.id, microneedling_treatment: microneedling_treatment.id }).url
        },
        {
            title,
            href: showMicroneedlingTreatment({ customer: customer.id, microneedling_treatment: microneedling_treatment.id }).url
        },
    ];


    const imagesList = [0, 1, 2].reduce((prevArray, index) => {
        // @ts-expect-error
        const photoField: keyof typeof microneedling_session = `photo_${index}`
        if (microneedling_session[photoField]) {
            prevArray.push(
                {
                    description: `Foto ${index + 1}`,
                    // @ts-expect-error
                    url: microneedling_session[photoField]
                })
        }
        return prevArray
    }, [] as CarouselElement[])

    const dateHour = microneedling_session.date_hour ? format(new Date(microneedling_session.date_hour.slice(0, -1)), 'dd/MM/yyyy, HH:mm') : null

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
                                    <Link href={`/customers/${customer.id}/microneedling_treatments/${microneedling_treatment.id}/microneedling_sessions/${microneedling_session.id}/edit`}><PencilIcon /></Link>
                                </Button>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="outline" size="icon"><Trash2Icon /></Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Confirmas que deseas borrar esta sesión?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Esta acción eliminará la sesión e imagenes relacionadas y no puede ser deshecha...
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                            <AlertDialogAction asChild>
                                                <Link href={destroy({ customer: customer.id, microneedling_treatment: microneedling_treatment.id, microneedling_session: microneedling_session.id })}>Sí, borrar</Link>
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </ButtonGroup>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div>
                                <ItemTitle className='mt-4'>
                                    Activo
                                </ItemTitle>
                                <ItemDescription>
                                    {microneedling_session.activo || '-'}
                                </ItemDescription>
                            </div>
                            <div>
                                <ItemTitle className='mt-4'>
                                    Agujas
                                </ItemTitle>
                                <ItemDescription>
                                    {microneedling_session.agujas || '-'}
                                </ItemDescription>
                            </div>
                            <div>
                                <ItemTitle className='mt-4'>
                                    Precio
                                </ItemTitle>
                                <ItemDescription>
                                    {microneedling_session.price || '-'}
                                </ItemDescription>
                            </div>
                            <div>
                                <ItemTitle className='mt-4'>
                                    Fecha y hora
                                </ItemTitle>
                                <ItemDescription>
                                    {dateHour || '-'}
                                </ItemDescription>
                            </div>
                            <div>
                                <ItemTitle className='mt-4'>
                                    Notas
                                </ItemTitle>
                                <ItemDescription className='line-clamp-none'>
                                    {microneedling_session.notes || '-'}
                                </ItemDescription>
                            </div>
                        </div>
                    </ItemContent>
                </Item>
            </ItemGroup>
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
