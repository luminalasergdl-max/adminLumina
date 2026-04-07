import AppLayout from '@/layouts/app-layout';

import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { ExtendedSupplier } from "@/types/supplier";

import {
    ItemGroup,
    Item,
    ItemContent,
    ItemDescription,
    ItemTitle,
} from "@/components/ui/item"

import { ButtonGroup } from "@/components/ui/button-group"
import { Link, router } from '@inertiajs/react'

import { Button } from "@/components/ui/button"
import { Trash2Icon, PencilIcon } from "lucide-react"

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

export default function SupplierShow({ supplier }: { supplier: ExtendedSupplier }) {

    const title = supplier.supplier_name

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Proveedores',
            href: '/suppliers',
        },
        {
            title,
            href: `/suppliers/${supplier.supplier_id}`,
        },
    ];

    const handleDelete = () => {
        router.delete(`/suppliers/${supplier.supplier_id}`)
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <ItemGroup className='m-8'>
                <Item variant="outline">
                    <ItemContent>
                        <div className='flex flex-row justify-between'>
                            <h2 className='text-xl md:text-3xl font-semibold'>
                                {supplier.supplier_name}
                            </h2>
                            <ButtonGroup>
                                <Button variant="outline" size="icon" asChild>
                                    <Link href={`/suppliers/${supplier.supplier_id}/edit`}><PencilIcon /></Link>
                                </Button>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="outline" size="icon"><Trash2Icon /></Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Confirmas que deseas borrar al proveedor?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Esta acción eliminará la información del proveedor de forma permanente y no podrá deshacerse.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                            <AlertDialogAction onClick={handleDelete}>
                                                Sí, borrar
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </ButtonGroup>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 mt-6">
                            <div>
                                <ItemTitle className='mt-4'>
                                    Nombre de Contacto
                                </ItemTitle>
                                <ItemDescription>
                                    {supplier.contact_name || '-'}
                                </ItemDescription>
                            </div>
                            <div>
                                <ItemTitle className='mt-4'>
                                    Teléfono
                                </ItemTitle>
                                <ItemDescription>
                                    {supplier.phone ?
                                        <a href={`https://wa.me/${supplier.phone}`} target='blank' rel="noopener" className="underline hover:text-primary">
                                            {supplier.phone}
                                        </a>
                                        : '-'}
                                </ItemDescription>
                            </div>
                            <div className="hidden lg:block">
                                <ItemTitle className='mt-4'>
                                    Email
                                </ItemTitle>
                                <ItemDescription>
                                    {supplier.email || '-'}
                                </ItemDescription>
                            </div>
                        </div>
                        <div className="mt-8">
                            <div>
                                <ItemTitle className='mt-4'>
                                    Dirección
                                </ItemTitle>
                                <ItemDescription>
                                    {supplier.address || '-'}
                                </ItemDescription>
                            </div>
                            <div>
                                <ItemTitle className='mt-4'>
                                    Notas
                                </ItemTitle>
                                <ItemDescription className="whitespace-pre-line mt-2">
                                    {supplier.notes || '-'}
                                </ItemDescription>
                            </div>
                        </div>
                    </ItemContent>
                </Item>
            </ItemGroup>
        </AppLayout>
    )
}
