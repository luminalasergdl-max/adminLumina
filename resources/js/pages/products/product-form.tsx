import React from 'react'

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Form } from '@inertiajs/react';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldError,
} from "@/components/ui/field"

import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';

import { ExtendedProduct } from '@/types/product';

export default function ProductForm({ product }: { product?: ExtendedProduct }) {

    const title = product ? "Editar Producto" : "Crear Producto"
    const action = product ? `/products/${product.id}` : "/products"
    const method = product ? "put" : "post"

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Productos',
            href: '/products',
        },
        {
            title,
            href: product ? `/products/${product.id}/edit` : '/products/create',
        },
    ];

    const handleSuccess = () => {
        const actionText = product ? 'editado' : 'creado'
        alert(`Producto ${actionText} con éxito!`)
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <Form action={action} method={method} onSuccess={handleSuccess}>
                {({ errors }) => (
                    <>
                        <Card className="m-8">
                            <CardHeader>
                                <CardTitle>Datos del Producto</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6 lg:grid-cols-2">
                                    <FieldGroup>
                                        <Field>
                                            <FieldLabel>
                                                Nombre *
                                            </FieldLabel>
                                            <Input type="text" name="name" defaultValue={product?.name} />
                                            {errors.name && <FieldError>{errors.name}</FieldError>}
                                        </Field>
                                        <Field>
                                            <FieldLabel>
                                                Marca *
                                            </FieldLabel>
                                            <Input type="text" name="brand" defaultValue={product?.brand} />
                                            {errors.brand && <FieldError>{errors.brand}</FieldError>}
                                        </Field>
                                        <Field>
                                            <FieldLabel>
                                                Presentación
                                            </FieldLabel>
                                            <Input type="text" name="presentation" defaultValue={product?.presentation} />
                                            {errors.presentation && <FieldError>{errors.presentation}</FieldError>}
                                        </Field>
                                    </FieldGroup>
                                    <FieldGroup>
                                        <Field>
                                            <FieldLabel>
                                                Unidad de Medida
                                            </FieldLabel>
                                            <Input type="text" name="unit_of_measurement" defaultValue={product?.unit_of_measurement} />
                                            {errors.unit_of_measurement && <FieldError>{errors.unit_of_measurement}</FieldError>}
                                        </Field>
                                        <Field>
                                            <FieldLabel>
                                                Stock Mínimo
                                            </FieldLabel>
                                            <Input type="number" name="minimum_stock" defaultValue={product?.minimum_stock ?? 5} min={0} />
                                            {errors.minimum_stock && <FieldError>{errors.minimum_stock}</FieldError>}
                                        </Field>
                                    </FieldGroup>
                                </div>
                                <div className="mt-6">
                                    <Field>
                                        <FieldLabel>
                                            Notas
                                        </FieldLabel>
                                        <Textarea name="notes" defaultValue={product?.notes} rows={4} />
                                        {errors.notes && <FieldError>{errors.notes}</FieldError>}
                                    </Field>
                                </div>
                            </CardContent>
                        </Card>
                        <div className='m-8'>
                            <Button className="w-full h-14" type="submit" size="lg">{title}</Button>
                        </div>
                    </>
                )}
            </Form>
        </AppLayout >
    )
}
