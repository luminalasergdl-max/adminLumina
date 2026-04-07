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

import { ExtendedSupplier } from '@/types/supplier';

export default function SupplierForm({ supplier }: { supplier?: ExtendedSupplier }) {

    const title = supplier ? "Editar Proveedor" : "Crear Proveedor"
    const action = supplier ? `/suppliers/${supplier.supplier_id}` : "/suppliers"
    const method = supplier ? "put" : "post"

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Proveedores',
            href: '/suppliers',
        },
        {
            title,
            href: supplier ? `/suppliers/${supplier.supplier_id}/edit` : '/suppliers/create',
        },
    ];

    const handleSuccess = () => {
        const action = supplier ? 'editado' : 'creado'
        alert(`Proveedor ${action} con éxito!`)
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <Form action={action} method={method} onSuccess={handleSuccess}>
                {({ errors }) => (
                    <>
                        <Card className="m-8">
                            <CardHeader>
                                <CardTitle>Datos del Proveedor</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6 lg:grid-cols-2">
                                    <FieldGroup>
                                        <Field>
                                            <FieldLabel>
                                                Nombre de la Empresa / Proveedor *
                                            </FieldLabel>
                                            <Input type="text" name="supplier_name" defaultValue={supplier?.supplier_name} />
                                            {errors.supplier_name && <FieldError>{errors.supplier_name}</FieldError>}
                                        </Field>
                                        <Field>
                                            <FieldLabel>
                                                Nombre del Contacto
                                            </FieldLabel>
                                            <Input type="text" name="contact_name" defaultValue={supplier?.contact_name} />
                                            {errors.contact_name && <FieldError>{errors.contact_name}</FieldError>}
                                        </Field>
                                        <Field>
                                            <FieldLabel>
                                                Teléfono
                                            </FieldLabel>
                                            <Input type="text" name="phone" defaultValue={supplier?.phone} />
                                            {errors.phone && <FieldError>{errors.phone}</FieldError>}
                                        </Field>
                                    </FieldGroup>
                                    <FieldGroup>
                                        <Field>
                                            <FieldLabel>
                                                Email
                                            </FieldLabel>
                                            <Input type="email" name="email" defaultValue={supplier?.email} />
                                            {errors.email && <FieldError>{errors.email}</FieldError>}
                                        </Field>
                                        <Field>
                                            <FieldLabel>
                                                Dirección
                                            </FieldLabel>
                                            <Input type="text" name="address" defaultValue={supplier?.address} />
                                            {errors.address && <FieldError>{errors.address}</FieldError>}
                                        </Field>
                                        <Field>
                                            <FieldLabel>
                                                Notas
                                            </FieldLabel>
                                            <Textarea name="notes" defaultValue={supplier?.notes} rows={4} />
                                            {errors.notes && <FieldError>{errors.notes}</FieldError>}
                                        </Field>
                                    </FieldGroup>
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
