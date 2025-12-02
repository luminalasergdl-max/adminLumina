import AppLayout from '@/layouts/app-layout';

import { index as indexCustomers, show as showCustomers } from '@/routes/customers';
import { create } from '@/routes/customers/laser_treatments';

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
    FieldError,
} from "@/components/ui/field"

import { Checkbox } from "@/components/ui/checkbox"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Textarea } from "@/components/ui/textarea"

import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { ExtendedCustomer } from '@/types/customer';
import { LaserTreatment } from '@/types/laser-treatment';
import { LaserCategory } from '@/types/laser-category';

type LaserTreatmentFormProps = {
    customer: ExtendedCustomer
    laser_categories: LaserCategory[]
    laser_treatment?: LaserTreatment
}

export default function LaserTreatmentForm({ customer, laser_treatment, laser_categories }: LaserTreatmentFormProps) {
    const title = laser_treatment ? 'Editar Tratamiento' : 'Nuevo Tratamiento'
    const action = laser_treatment
        ? `/customers/${customer.id}/laser_treatments/${laser_treatment.id}`
        : `/customers/${customer.id}/laser_treatments`
    const method = laser_treatment ? "put" : "post"
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
                                    Tratamiento Láser
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6 lg:grid-cols-2">
                                    <FieldGroup>
                                        <Field>
                                            <FieldLabel>
                                                Categoría *
                                            </FieldLabel>
                                            <Select
                                                defaultValue={laser_treatment?.laser_category_id.toString()}
                                                value={laser_treatment?.laser_category_id.toString()}
                                                name="laser_category_id"
                                            >
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Selecciona una categoría" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {laser_categories.map((category) => (
                                                        <SelectItem key={category.id} value={String(category.id)}>{category.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {errors.laser_category_id && <FieldError>Categoría obligatoria</FieldError>}
                                        </Field>
                                        <Field>
                                            <FieldLabel>
                                                Descripción breve *
                                            </FieldLabel>
                                            <Input type="text" name="brief_description" defaultValue={laser_treatment?.brief_description} />
                                            {errors.brief_description && <FieldError>Descripción breve obligatoria</FieldError>}
                                        </Field>
                                        <Field>
                                            <FieldLabel>
                                                Lugar anatómico
                                            </FieldLabel>
                                            <Input type="text" name="anatomic_place" defaultValue={laser_treatment?.anatomic_place} />
                                        </Field>
                                        <Field>
                                            <FieldLabel>
                                                Tamaño
                                            </FieldLabel>
                                            <Input type="text" name="size" defaultValue={laser_treatment?.size} />
                                        </Field>
                                    </FieldGroup>
                                    <FieldGroup>
                                        <Field>
                                            <FieldLabel>
                                                Antigüedad (en años)
                                            </FieldLabel>
                                            <Input type="number" name="years" defaultValue={laser_treatment?.years} />
                                            {errors.years && <FieldError>Máximo 2 digitos</FieldError>}
                                        </Field>
                                        <Field>
                                            <FieldLabel>
                                                Número de retoques
                                            </FieldLabel>
                                            <Input type="number" name="retouching" defaultValue={laser_treatment?.retouching} />
                                            {errors.retouching && <FieldError>Máximo 2 digitos</FieldError>}
                                        </Field>
                                        <Field>
                                            <FieldLabel>
                                                Notas (Observaciones)
                                            </FieldLabel>
                                            <Textarea name="notes" defaultValue={laser_treatment?.notes} />
                                        </Field>
                                    </FieldGroup>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="m-8">
                            <CardHeader>
                                <CardTitle>Tratamientos previos?</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6 lg:grid-cols-2">
                                    <FieldGroup>
                                        <Field orientation="horizontal">
                                            <Checkbox
                                                id="laser"
                                                name="laser"
                                                value="1"
                                                defaultChecked={laser_treatment?.laser}
                                            />
                                            <FieldLabel
                                                htmlFor="laser"
                                            >
                                                Láser
                                            </FieldLabel>
                                        </Field>
                                        <Field orientation="horizontal">
                                            <Checkbox
                                                id="surgery"
                                                name="surgery"
                                                value="1"
                                                defaultChecked={laser_treatment?.surgery}
                                            />
                                            <FieldLabel
                                                htmlFor="surgery"
                                            >
                                                Cirugía
                                            </FieldLabel>
                                        </Field>
                                    </FieldGroup>
                                    <FieldGroup>
                                        <Field orientation="horizontal">
                                            <Checkbox
                                                id="acid"
                                                name="acid"
                                                value="1"
                                                defaultChecked={laser_treatment?.acid}
                                            />
                                            <FieldLabel
                                                htmlFor="acid"
                                            >
                                                Acido
                                            </FieldLabel>
                                        </Field>
                                        <Field orientation="horizontal">
                                            <FieldLabel>
                                                Otro
                                            </FieldLabel>
                                            <Input type="text" name="other" defaultValue={laser_treatment?.other} />
                                        </Field>
                                    </FieldGroup>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="m-8">
                            {laser_treatment ?
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
                                        <CardTitle>Fotos Iniciales</CardTitle>
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
                        <input type="hidden" name="customer_id" value={customer.id}></input>
                    </>
                )}
            </Form>
        </AppLayout>
    )
}
