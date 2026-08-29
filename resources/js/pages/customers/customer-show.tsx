import AppLayout from '@/layouts/app-layout';

import { Head } from '@inertiajs/react';

import { type BreadcrumbItem } from '@/types';
import { ExtendedCustomer } from '@/types/customer';

import { CustomerShowAppointmentsTable } from './customer-show-appointments-table';
import { CustomerShowDrawer } from './customer-show-drawer';
import { CustomerShowLaserTreatmentsTable } from './customer-show-laser-treatments-table';
import { CustomerShowMicroneedlingTreatmentsTable } from './customer-show-microneedling-treatments-table';

import { create, destroy, index } from '@/routes/customers';

import { create as createLaserTreatments } from '@/routes/customers/laser_treatments';

import { create as createMicroneedlingTreatments } from '@/routes/customers/microneedling_treatments';

import { Item, ItemContent, ItemDescription, ItemGroup, ItemTitle } from '@/components/ui/item';

import { ButtonGroup } from '@/components/ui/button-group';

import { Link } from '@inertiajs/react';

import { Button } from '@/components/ui/button';

import { PencilIcon, Trash2Icon } from 'lucide-react';

import { format } from 'date-fns';

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
} from '@/components/ui/alert-dialog';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import { LaserCategory } from '@/types/laser-category';

export default function CustomerShow({ customer, laser_categories }: { customer: ExtendedCustomer; laser_categories: LaserCategory[] }) {
    const title = customer.full_name;

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

    const birthdateString = customer.birthdate ? format(new Date(customer.birthdate.slice(0, -1)), 'dd/MMMM/yyyy') : '-';
    const primaryWhatsAppUrl = getWhatsAppUrl(customer.contact_phone_1);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <ItemGroup className="m-8">
                <Item variant="outline">
                    <ItemContent>
                        <div className="flex flex-row justify-between">
                            <h2 className="text-xl font-semibold md:text-3xl">{customer.full_name}</h2>
                            <ButtonGroup>
                                <Button variant="outline" size="icon" asChild>
                                    <Link href={`/customers/${customer.id}/edit`}>
                                        <PencilIcon />
                                    </Link>
                                </Button>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="outline" size="icon">
                                            <Trash2Icon />
                                        </Button>
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
                                <ItemTitle className="mt-4">Telefóno de contacto</ItemTitle>
                                <ItemDescription>
                                    {primaryWhatsAppUrl ? (
                                        <a href={primaryWhatsAppUrl} target="_blank" rel="noopener noreferrer">
                                            {customer.contact_phone_1}
                                        </a>
                                    ) : (
                                        customer.contact_phone_1 || '-'
                                    )}
                                </ItemDescription>
                            </div>
                            <div className="hidden lg:block">
                                <ItemTitle className="mt-4">Email</ItemTitle>
                                <ItemDescription>{customer.email || '-'}</ItemDescription>
                            </div>
                            <div className="hidden lg:block">
                                <ItemTitle className="mt-4">Genero</ItemTitle>
                                <ItemDescription>
                                    <span className="capitalize">{customer.gender || '-'}</span>
                                </ItemDescription>
                            </div>
                            <div className="hidden lg:block">
                                <ItemTitle className="mt-4">Fecha de nacimiento</ItemTitle>
                                <ItemDescription>
                                    <span className="capitalize">{birthdateString}</span>
                                </ItemDescription>
                            </div>
                            <div className="hidden lg:block">
                                <ItemTitle className="mt-4">Código Postal</ItemTitle>
                                <ItemDescription>
                                    <span className="capitalize">{customer.zip_code || '-'}</span>
                                </ItemDescription>
                            </div>
                        </div>
                        <CustomerShowDrawer customer={customer} birthdateString={birthdateString} />
                    </ItemContent>
                </Item>
            </ItemGroup>
            <div className="m-8">
                <div className="flex justify-between gap-16 sm:gap-2">
                    <h2 className="text-xl font-semibold md:text-3xl">Tratamientos Láser</h2>
                    <Link
                        href={createLaserTreatments(customer.id).url}
                        method={createLaserTreatments(customer.id).method}
                        as="button"
                        className="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium whitespace-nowrap text-primary-foreground transition-all outline-none hover:bg-primary/90 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 has-[>svg]:px-3 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
                    >
                        Nuevo Tratamiento
                    </Link>
                </div>
                <CustomerShowLaserTreatmentsTable customer={customer} laserCategories={laser_categories} />
            </div>
            <div className="m-8">
                <div className="flex justify-between gap-16 sm:gap-2">
                    <h2 className="text-xl font-semibold md:text-3xl">Microneedling</h2>
                    <Link
                        href={createMicroneedlingTreatments(customer.id).url}
                        method={createMicroneedlingTreatments(customer.id).method}
                        as="button"
                        className="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium whitespace-nowrap text-primary-foreground transition-all outline-none hover:bg-primary/90 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 has-[>svg]:px-3 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
                    >
                        Nuevo Microneedling
                    </Link>
                </div>
                <CustomerShowMicroneedlingTreatmentsTable customer={customer} />
            </div>
            <div className="m-8">
                <div className="flex justify-between gap-16 sm:gap-2">
                    <h2 className="text-xl font-semibold md:text-3xl">Citas</h2>
                    <Link
                        href="/calendar"
                        className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium whitespace-nowrap text-primary-foreground transition-all outline-none hover:bg-primary/90 focus-visible:border-ring focus-visible:ring-ring/50"
                    >
                        Ver Calendario
                    </Link>
                </div>
                <CustomerShowAppointmentsTable customer={customer} />
            </div>
        </AppLayout>
    );
}
