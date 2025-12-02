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
import { show as showLaserTreatment } from '@/routes/customers/laser_treatments';
import { show, destroy } from '@/routes/customers/laser_treatments/laser_sessions'

import { type BreadcrumbItem } from '@/types';

import { ExtendedCustomer } from '@/types/customer';
import { LaserSession } from '@/types/laser-session'
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

type LaserSessionShowProps = {
    customer: ExtendedCustomer
    laser_session: LaserSession
    laser_treatment: LaserTreatment
    session_index: number
}

export default function LaserSessionShow({ customer, laser_treatment, laser_session, session_index }: LaserSessionShowProps) {
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
            title: laser_treatment.brief_description,
            href: showLaserTreatment({ customer: customer.id, laser_treatment: laser_treatment.id }).url
        },
        {
            title,
            href: showLaserTreatment({ customer: customer.id, laser_treatment: laser_treatment.id }).url
        },
    ];


    const imagesList = [0, 1, 2].reduce((prevArray, index) => {
        // @ts-expect-error
        const photoField: keyof typeof laser_session = `photo_${index}`
        if (laser_session[photoField]) {
            prevArray.push(
                {
                    description: `Foto ${index + 1}`,
                    // @ts-expect-error
                    url: laser_session[photoField]
                })
        }
        return prevArray
    }, [] as CarouselElement[])

    const dateHour = laser_session.date_hour ? format(new Date(laser_session.date_hour.slice(0, -1)), 'dd/MM/yyyy, HH:mm') : null

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
                                    <Link href={`/customers/${customer.id}/laser_treatments/${laser_treatment.id}/laser_sessions/${laser_session.id}/edit`}><PencilIcon /></Link>
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
                                                <Link href={destroy({ customer: customer.id, laser_treatment: laser_treatment.id, laser_session: laser_session.id })}>Sí, borrar</Link>
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </ButtonGroup>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4">
                            <div>
                                <ItemTitle className='mt-4'>
                                    Potencia
                                </ItemTitle>
                                <ItemDescription>
                                    {laser_session.power || '-'}
                                </ItemDescription>
                            </div>
                            <div>
                                <ItemTitle className='mt-4'>
                                    Cabezal
                                </ItemTitle>
                                <ItemDescription>
                                    {laser_session.header || '-'}
                                </ItemDescription>
                            </div>
                            <div>
                                <ItemTitle className='mt-4'>
                                    Pasadas
                                </ItemTitle>
                                <ItemDescription>
                                    {laser_session.passes || '-'}
                                </ItemDescription>
                            </div>
                            <div>
                                <ItemTitle className='mt-4'>
                                    Precio
                                </ItemTitle>
                                <ItemDescription>
                                    {laser_session.price || '-'}
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
                                <ItemDescription>
                                    {laser_session.notes || '-'}
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
