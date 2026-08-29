import AppLayout from '@/layouts/app-layout';

import { index as indexCustomers, show as showCustomers } from '@/routes/customers';

import { type BreadcrumbItem } from '@/types';
import { Form, Head } from '@inertiajs/react';

import { ExtendedCustomer } from '@/types/customer';
import { MicroneedlingTreatment } from '@/types/microneedling-treatment';

import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';

import { Checkbox } from '@/components/ui/checkbox';

import { Textarea } from '@/components/ui/textarea';

type MicroneedlingTreatmentFormProps = {
    customer: ExtendedCustomer;
    microneedling_treatment?: MicroneedlingTreatment;
};

function getCurrentLocalDateTime() {
    const now = new Date();
    const localNow = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);

    return localNow.toISOString().slice(0, 16);
}

export default function MicroneedlingTreatmentForm({ customer, microneedling_treatment }: MicroneedlingTreatmentFormProps) {
    const title = (microneedling_treatment ? 'Editar' : 'Nuevo') + ' Tratamiento (MICRONEEDLING)';
    const action = microneedling_treatment
        ? `/customers/${customer.id}/microneedling_treatments/${microneedling_treatment.id}`
        : `/customers/${customer.id}/microneedling_treatments`;
    const method = microneedling_treatment ? 'PUT' : 'POST';
    const photoFields = [0, 1, 2];

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
            title,
            href: '',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <Form action={action} method={method} encType="multipart/form-data">
                {({ errors }) => (
                    <>
                        <Card className="m-8">
                            <CardHeader>
                                <CardTitle>Microneedling</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6 lg:grid-cols-2">
                                    <FieldGroup>
                                        <Field>
                                            <FieldLabel>Objetivo *</FieldLabel>
                                            <Input type="text" name="objective" defaultValue={microneedling_treatment?.objective} />
                                            {errors.objective && <FieldError>Objetivo obligatorio</FieldError>}
                                        </Field>
                                        <Field>
                                            <FieldLabel>Lugar anatómico</FieldLabel>
                                            <Input type="text" name="anatomic_place" defaultValue={microneedling_treatment?.anatomic_place} />
                                        </Field>
                                    </FieldGroup>
                                    <FieldGroup>
                                        <Field>
                                            <FieldLabel>Activo</FieldLabel>
                                            <Input type="text" name="activo" defaultValue={microneedling_treatment?.activo} />
                                        </Field>
                                        <Field>
                                            <FieldLabel>Notas (Observaciones)</FieldLabel>
                                            <Textarea name="notes" defaultValue={microneedling_treatment?.notes} />
                                        </Field>
                                    </FieldGroup>
                                </div>
                            </CardContent>
                        </Card>
                        {!microneedling_treatment && (
                            <Card className="m-8">
                                <CardHeader>
                                    <CardTitle>Primera sesión</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-6 lg:grid-cols-2">
                                        <Field>
                                            <FieldLabel>Precio *</FieldLabel>
                                            <Input type="number" name="initial_session_price" min="0" step="1" required />
                                            {errors.initial_session_price && <FieldError>{errors.initial_session_price}</FieldError>}
                                        </Field>
                                        <Field>
                                            <FieldLabel>Fecha y hora *</FieldLabel>
                                            <Input
                                                type="datetime-local"
                                                name="initial_session_date_hour"
                                                defaultValue={getCurrentLocalDateTime()}
                                                required
                                            />
                                            {errors.initial_session_date_hour && <FieldError>{errors.initial_session_date_hour}</FieldError>}
                                        </Field>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                        <Card className="m-8">
                            <CardHeader>
                                <CardTitle>Tratamientos previos?</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6 lg:grid-cols-2">
                                    <FieldGroup>
                                        <Field orientation="horizontal">
                                            <Checkbox id="laser" name="laser" value="1" defaultChecked={microneedling_treatment?.laser} />
                                            <FieldLabel htmlFor="laser">Láser</FieldLabel>
                                        </Field>
                                        <Field orientation="horizontal">
                                            <Checkbox id="surgery" name="surgery" value="1" defaultChecked={microneedling_treatment?.surgery} />
                                            <FieldLabel htmlFor="surgery">Cirugía</FieldLabel>
                                        </Field>
                                    </FieldGroup>
                                    <FieldGroup>
                                        <Field orientation="horizontal">
                                            <Checkbox id="acid" name="acid" value="1" defaultChecked={microneedling_treatment?.acid} />
                                            <FieldLabel htmlFor="acid">Acido</FieldLabel>
                                        </Field>
                                        <Field orientation="horizontal">
                                            <FieldLabel>Otro</FieldLabel>
                                            <Input type="text" name="other" defaultValue={microneedling_treatment?.other} />
                                        </Field>
                                    </FieldGroup>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="m-8">
                            {microneedling_treatment ? (
                                <>
                                    <CardHeader>
                                        <CardTitle>Editar Fotos Iniciales</CardTitle>
                                    </CardHeader>
                                    <CardContent></CardContent>
                                </>
                            ) : (
                                <>
                                    <CardHeader>
                                        <CardTitle>Fotos Iniciales</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-6 lg:grid-cols-2">
                                            {photoFields.map((photoIndex) => (
                                                <Field key={photoIndex}>
                                                    <FieldLabel>Foto {++photoIndex}</FieldLabel>
                                                    <input
                                                        type="file"
                                                        name="photo[]"
                                                        accept="image/*"
                                                        className="block w-full text-sm file:mr-4 file:rounded-full file:border-0 file:py-2 file:text-sm file:font-semibold"
                                                    />
                                                </Field>
                                            ))}
                                        </div>
                                    </CardContent>
                                </>
                            )}
                        </Card>
                        <div className="m-8">
                            <Button className="h-14 w-full" type="submit" size="lg">
                                {title}
                            </Button>
                        </div>
                        <input type="hidden" name="customer_id" value={customer.id}></input>
                    </>
                )}
            </Form>
        </AppLayout>
    );
}
