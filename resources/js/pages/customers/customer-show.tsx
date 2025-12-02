import AppLayout from '@/layouts/app-layout';

import { Head } from '@inertiajs/react';

import { type BreadcrumbItem } from '@/types';
import { ExtendedCustomer } from "@/types/customer";

import { CustomerShowDrawer } from "./customer-show-drawer";
import { CustomerShowLaserTreatmentsTable } from './customer-show-laser-treatments-table';

import { index, create, destroy } from '@/routes/customers';

import { create as createLaserTreatments } from '@/routes/customers/laser_treatments';

import {
    ItemGroup,
    Item,
    ItemContent,
    ItemDescription,
    ItemTitle,
} from "@/components/ui/item"

import { ButtonGroup } from "@/components/ui/button-group"

import { Link } from '@inertiajs/react'

import {
    Button
} from "@/components/ui/button"

import { Trash2Icon, PencilIcon } from "lucide-react"

import { format } from 'date-fns'

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
import { LaserCategory } from '@/types/laser-category';


export default function CustomerShow({ customer, laser_categories }: { customer: ExtendedCustomer, laser_categories: LaserCategory[] }) {

    const title = customer.full_name

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Clientes',
            href: index().url,
        },
        {
            title,
            href: create().url,
        },
    ];


    const birthdateString = customer.birthdate ? format(new Date(customer.birthdate.slice(0, -1)), 'dd/MMMM/yyyy') : '-'

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <ItemGroup className='m-8'>
                <Item variant="outline">
                    <ItemContent>
                        <div className='flex flex-row justify-between'>
                            <h2 className='text-xl md:text-3xl font-semibold'>
                                {customer.full_name}
                            </h2>
                            <ButtonGroup>
                                <Button variant="outline" size="icon" asChild>
                                    <Link href={`/customers/${customer.id}/edit`}><PencilIcon /></Link>
                                </Button>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="outline" size="icon"><Trash2Icon /></Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Confirmas que deseas borrar a este cliente?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Esta acción eliminará todos los tratamientos y citas de este cliente, y no puede ser deshecha...
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                            <AlertDialogAction asChild>
                                                <Link href={destroy(customer.id)}>Sí, borrar</Link>
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </ButtonGroup>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4">
                            <div>
                                <ItemTitle className='mt-4'>
                                    Telefóno de contacto
                                </ItemTitle>
                                <ItemDescription>
                                    {customer.contact_phone_1 ?
                                        <a href={`https://wa.me/${customer.contact_phone_1}`} target='blank' rel="noopener" >
                                            {customer.contact_phone_1}
                                        </a>
                                        : '-'}
                                </ItemDescription>
                            </div>
                            <div className="hidden lg:block">
                                <ItemTitle className='mt-4'>
                                    Email
                                </ItemTitle>
                                <ItemDescription>
                                    {customer.email || '-'}
                                </ItemDescription>
                            </div>
                            <div className="hidden lg:block">
                                <ItemTitle className='mt-4'>
                                    Genero
                                </ItemTitle>
                                <ItemDescription>
                                    <span className='capitalize'>{customer.gender || '-'}</span>
                                </ItemDescription>
                            </div>
                            <div className="hidden lg:block">
                                <ItemTitle className='mt-4'>
                                    Fecha de nacimiento
                                </ItemTitle>
                                <ItemDescription>
                                    <span className='capitalize'>{birthdateString}</span>
                                </ItemDescription>
                            </div>
                            <div className="hidden lg:block">
                                <ItemTitle className='mt-4'>
                                    Código Postal
                                </ItemTitle>
                                <ItemDescription>
                                    <span className='capitalize'>{customer.zip_code || '-'}</span>
                                </ItemDescription>
                            </div>
                        </div>
                        <CustomerShowDrawer customer={customer} birthdateString={birthdateString} />
                    </ItemContent>
                </Item>
            </ItemGroup>
            <div className='m-8'>
                <div className="flex justify-between  gap-16 sm:gap-2">
                    <h2 className='text-xl md:text-3xl font-semibold'>
                        Tratamientos Láser
                    </h2>
                    <Link
                        href={createLaserTreatments(customer.id).url}
                        method={createLaserTreatments(customer.id).method}
                        as="button"
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 has-[>svg]:px-3"
                    >
                        Nuevo Tratamiento
                    </Link>
                </div>
                <CustomerShowLaserTreatmentsTable
                    customer={customer}
                    laserCategories={laser_categories}
                />
            </div>
        </AppLayout>
    )
}
