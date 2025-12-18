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
import { LaserSession } from '@/types/laser-session';

type LaserSessionFormProps = {
    customer: ExtendedCustomer
    laser_treatment: LaserTreatment
    laser_session?: LaserSession
}

export default function LaserSessionForm({ customer, laser_treatment, laser_session }: LaserSessionFormProps) {
    const title = laser_session ? 'Editar Sesión' : 'Nueva Sesión'
    const action = laser_session
        ? `/customers/${customer.id}/laser_treatments/${laser_treatment.id}/laser_sessions/${laser_session.id}`
        : `/customers/${customer.id}/laser_treatments/${laser_treatment.id}/laser_sessions`
    const method = laser_session ? "put" : "post"
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
            <Form action={action} method={method} encType='multipart/form-data'>
                {({
                    errors, }) => (
                    <>
                        <Card className="m-8">
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
                                                Potencia
                                            </FieldLabel>
                                            <Input type="text" name="power" defaultValue={laser_session?.power} />
                                        </Field>
                                        <Field>
                                            <FieldLabel>
                                                Cabezal
                                            </FieldLabel>
                                            <Input type="text" name="header" defaultValue={laser_session?.header} />
                                        </Field>
                                        <Field>
                                            <FieldLabel>
                                                Pasadas
                                            </FieldLabel>
                                            <Input type="text" name="passes" defaultValue={laser_session?.passes} />
                                        </Field>
                                    </FieldGroup>
                                    <FieldGroup>
                                        <Field>
                                            <FieldLabel>
                                                Fecha y hora
                                            </FieldLabel>
                                            <Input type="datetime-local" name="date_hour" defaultValue={laser_session?.date_hour?.slice(0,-8)}/>
                                        </Field>
                                        <Field>
                                            <FieldLabel>
                                                Precio
                                            </FieldLabel>
                                            <Input type="number" name="price" defaultValue={laser_session?.price} />
                                        </Field>
                                        <Field>
                                            <FieldLabel>
                                                Notas (Observaciones)
                                            </FieldLabel>
                                            <Textarea name="notes" defaultValue={laser_session?.notes} />
                                        </Field>
                                    </FieldGroup>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="m-8">
                            {laser_session ?
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
