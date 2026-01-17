import AppLayout from '@/layouts/app-layout';

import { index as indexCustomers, show as showCustomers } from '@/routes/customers'
import { show as showMicroneedlingTreatments } from '@/routes/customers/microneedling_treatments';

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
import { MicroneedlingTreatment } from '@/types/microneedling-treatment';
import { MicroneedlingSession } from '@/types/microneedling-session';

type MicroneedlingSessionFormProps = {
    customer: ExtendedCustomer
    microneedling_treatment: MicroneedlingTreatment
    microneedling_session?: MicroneedlingSession
}

export default function MicroneedlingSessionForm({ customer, microneedling_treatment, microneedling_session }: MicroneedlingSessionFormProps) {
    const title = (microneedling_session ? 'Editar' : 'Nueva') + ' Sesión'
    const action = microneedling_session
        ? `/customers/${customer.id}/microneedling_treatments/${microneedling_treatment.id}/microneedling_sessions/${microneedling_session.id}`
        : `/customers/${customer.id}/microneedling_treatments/${microneedling_treatment.id}/microneedling_sessions`
    const method = microneedling_session ? "put" : "post"
    const photoFields = [0, 1, 2]

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
            href: showMicroneedlingTreatments([customer.id, microneedling_treatment.id]).url
        },
        {
            title,
            href: ''
        },
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <Form action={action} method={method} encType='multipart/form-data'>
                {({
                    errors
                }) => (
                    <>
                        <Card className='m-8'>
                            <CardHeader>
                                <CardTitle>
                                    Datos de sesión
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6 lg:grid-cols-2">
                                    <FieldGroup>
                                        <Field>
                                            <FieldLabel>
                                                Activo usado
                                            </FieldLabel>
                                            <Input type="text" name="activo" defaultValue={microneedling_session?.activo} />
                                        </Field>
                                        <Field>
                                            <FieldLabel>
                                                Agujas
                                            </FieldLabel>
                                            <Input type="text" name="agujas" defaultValue={microneedling_session?.agujas} />
                                        </Field>
                                        <Field>
                                            <FieldLabel>
                                                Fecha y hora
                                            </FieldLabel>
                                            <Input type="datetime-local" name="date_hour" defaultValue={microneedling_session?.date_hour?.slice(0, -8)} />
                                        </Field>
                                    </FieldGroup>
                                    <FieldGroup>
                                        <Field>
                                            <FieldLabel>
                                                Precio
                                            </FieldLabel>
                                            <Input type="number" name="price" defaultValue={microneedling_session?.price} />
                                        </Field>
                                        <Field>
                                            <FieldLabel>
                                                Notas (Observaciones)
                                            </FieldLabel>
                                            <Textarea name="notes" defaultValue={microneedling_session?.notes} />
                                        </Field>
                                    </FieldGroup>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="m-8">
                            {microneedling_session ?
                                (
                                    <>
                                        <CardHeader>
                                            <CardTitle>Editar Fotos Iniciales</CardTitle>
                                        </CardHeader>
                                        <CardContent>

                                        </CardContent>
                                    </>) :
                                (<>
                                    <CardHeader>
                                        <CardTitle>Fotos de esta sesión</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-6 lg:grid-cols-2">
                                            {photoFields.map((photoIndex) => (
                                                <Field key={photoIndex}>
                                                    <FieldLabel>
                                                        Foto {++photoIndex}
                                                    </FieldLabel>
                                                    <input
                                                        type="file"
                                                        name="photo[]"
                                                        accept="image/*"
                                                        className="block w-full text-sm file:mr-4 file:py-2 file:rounded-full file:border-0 file:text-sm file:font-semibold"
                                                    />
                                                </Field>
                                            ))}
                                        </div>
                                    </CardContent>
                                </>)}
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
