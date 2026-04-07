import AppLayout from '@/layouts/app-layout';

import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { ExtendedProduct } from "@/types/product";

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

export default function ProductShow({ product }: { product: ExtendedProduct }) {

    const title = product.name

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Productos',
            href: '/products',
        },
        {
            title,
            href: `/products/${product.id}`,
        },
    ];

    const handleDelete = () => {
        router.delete(`/products/${product.id}`)
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <ItemGroup className='m-8'>
                <Item variant="outline">
                    <ItemContent>
                        <div className='flex flex-row justify-between'>
                            <h2 className='text-xl md:text-3xl font-semibold'>
                                {product.name}
                            </h2>
                            <ButtonGroup>
                                <Button variant="outline" size="icon" asChild>
                                    <Link href={`/products/${product.id}/edit`}><PencilIcon /></Link>
                                </Button>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="outline" size="icon"><Trash2Icon /></Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Confirmas que deseas borrar este producto?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Esta acción eliminará la información del producto de forma permanente y no podrá deshacerse.
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
                                    Marca
                                </ItemTitle>
                                <ItemDescription>
                                    {product.brand}
                                </ItemDescription>
                            </div>
                            <div>
                                <ItemTitle className='mt-4'>
                                    Presentación
                                </ItemTitle>
                                <ItemDescription>
                                    {product.presentation || '-'}
                                </ItemDescription>
                            </div>
                            <div>
                                <ItemTitle className='mt-4'>
                                    Unidad de Medida
                                </ItemTitle>
                                <ItemDescription>
                                    {product.unit_of_measurement || '-'}
                                </ItemDescription>
                            </div>
                            <div>
                                <ItemTitle className='mt-4'>
                                    Stock Mínimo
                                </ItemTitle>
                                <ItemDescription>
                                    {product.minimum_stock ?? '-'}
                                </ItemDescription>
                            </div>
                        </div>
                        <div className="mt-8">
                            <div>
                                <ItemTitle className='mt-4'>
                                    Notas
                                </ItemTitle>
                                <ItemDescription className="whitespace-pre-line mt-2">
                                    {product.notes || '-'}
                                </ItemDescription>
                            </div>
                        </div>
                    </ItemContent>
                </Item>
            </ItemGroup>
        </AppLayout>
    )
}
