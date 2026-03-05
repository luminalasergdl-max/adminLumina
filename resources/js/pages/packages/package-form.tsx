import AppLayout from '@/layouts/app-layout';

import { index as indexCustomers, show as showCustomers } from '@/routes/customers';
import { show as showLaserTreatments } from '@/routes/customers/laser_treatments';

import { type BreadcrumbItem } from '@/types';
import { Head, Form } from '@inertiajs/react';

import {
    Button
} from "@/components/ui/button"

import {
    Input
} from "@/components/ui/input"

import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"

import { Textarea } from "@/components/ui/textarea"

import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { ExtendedCustomer } from '@/types/customer';
import { LaserTreatment } from '@/types/laser-treatment';
import { Package } from '@/types/package';

type PackageFormProps = {
    customer: ExtendedCustomer
    laser_treatment: LaserTreatment
    package?: Package
}

export default function PackageForm({ customer, laser_treatment, package: packageData }: PackageFormProps) {
    const title = (packageData ? 'Editar' : 'Nuevo') + ' Paquete'
    const action = packageData
        ? `/customers/${customer.id}/laser_treatments/${laser_treatment.id}/packages/${packageData.id}`
        : `/customers/${customer.id}/laser_treatments/${laser_treatment.id}/packages`
    const method = packageData ? "put" : "post"

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
            href: showLaserTreatments([customer.id, laser_treatment.id]).url
        },
        {
            title,
            href: ''
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <Form action={action} method={method}>
                {({
                    errors, }) => (
                    <>
                        <Card className="m-8">
                            <CardHeader>
                                <CardTitle>
                                    Datos del paquete
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6 lg:grid-cols-2">
                                    <FieldGroup>
                                        <Field>
                                            <FieldLabel>
                                                Nombre del paquete
                                            </FieldLabel>
                                            <Input type="text" name="package_name" defaultValue={packageData?.package_name} />
                                        </Field>
                                        <Field>
                                            <FieldLabel>
                                                Precio
                                            </FieldLabel>
                                            <Input type="number" name="package_price" defaultValue={packageData?.package_price} />
                                        </Field>
                                    </FieldGroup>
                                    <FieldGroup>
                                        <Field>
                                            <FieldLabel>
                                                Sesiones totales
                                            </FieldLabel>
                                            <Input type="number" name="package_sessions_total" defaultValue={packageData?.package_sessions_total} />
                                        </Field>
                                    </FieldGroup>
                                    <FieldGroup className="lg:col-span-2">
                                        <Field>
                                            <FieldLabel>
                                                Notas (Observaciones)
                                            </FieldLabel>
                                            <Textarea name="notes" defaultValue={packageData?.notes} />
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
        </AppLayout>
    )
}
