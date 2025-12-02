import React from 'react'

import AppLayout from '@/layouts/app-layout';
import { index, create, show } from '@/routes/customers';
import { type BreadcrumbItem } from '@/types';
import { Head, Form, useForm } from '@inertiajs/react';

import {
    Button
} from "@/components/ui/button"

import {
    Input
} from "@/components/ui/input"

import {
    Calendar
} from '@/components/ui/calendar'

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

import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { ChevronDownIcon } from 'lucide-react';
import { ExtendedCustomer, diseaseFields } from '@/types/customer';

export default function CustomerForm
    ({ customer }: { customer?: ExtendedCustomer }) {

    const title = customer ? "Editar Cliente" : "Crear Cliente"
    const action = customer ? `/customers/${customer.id}` : "/customers"
    const method = customer ? "put" : "post"

    const [open, setOpen] = React.useState(false)
    const [date, setDate] = React.useState<Date | undefined>(customer?.birthdate ? new Date(customer?.birthdate.slice(0, -1)) : undefined)

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

    const handleSuccess = () => {
        const action = customer ? 'editado' : 'creado'
        alert(`Cliente ${action} con éxito!`)

    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <Form action={action} method={method} transform={data => ({ ...data, birthdate: date?.toISOString() })} onSuccess={handleSuccess}>
                {({
                    errors, }) => (
                    <>
                        <Card className="m-8">
                            <CardHeader>
                                <CardTitle>Datos Personales</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6 lg:grid-cols-2">
                                    <FieldGroup>
                                        <Field>
                                            <FieldLabel>
                                                Nombre *
                                            </FieldLabel>
                                            <Input type="text" name="full_name" defaultValue={customer?.full_name} />
                                            {errors.full_name && <FieldError>Nombre obligatorio</FieldError>}
                                        </Field>
                                        <Field>
                                            <FieldLabel>
                                                Fecha de nacimiento
                                            </FieldLabel>
                                            <Popover open={open} onOpenChange={setOpen}>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        id="date"
                                                        className="w-48 justify-between font-normal"
                                                    >
                                                        {date ? date.toLocaleDateString() : "Selecciona fecha"}
                                                        <ChevronDownIcon />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={date}
                                                        captionLayout="dropdown"
                                                        onSelect={(date) => {
                                                            setDate(date)
                                                            setOpen(false)
                                                        }}
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </Field>
                                        <Field>
                                            <FieldLabel>
                                                Genero
                                            </FieldLabel>
                                            <Select
                                                defaultValue={customer?.gender}
                                                value={customer?.gender}
                                                name="gender"
                                            >
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Selecciona un genero" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="masculino">Masculino</SelectItem>
                                                    <SelectItem value="femenino">Femenino</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </Field>
                                        <Field>
                                            <FieldLabel>
                                                Email
                                            </FieldLabel>
                                            <Input type="email" name="email" defaultValue={customer?.email} />
                                        </Field>
                                        <Field>
                                            <FieldLabel>
                                                Código Postal
                                            </FieldLabel>
                                            <Input type="text" name="zip_code" defaultValue={customer?.zip_code} />
                                        </Field>
                                    </FieldGroup>
                                    <FieldGroup>
                                        <Field>
                                            <FieldLabel>
                                                Telefono de contacto 1 *
                                            </FieldLabel>
                                            <Input type="phone" name="contact_phone_1" defaultValue={customer?.contact_phone_1} />
                                            {errors.contact_phone_1 && <FieldError>Teléfono obligatorio</FieldError>}
                                        </Field>
                                        <Field>
                                            <FieldLabel>
                                                Telefono de contacto 2
                                            </FieldLabel>
                                            <Input type="phone" name="contact_phone_2" defaultValue={customer?.contact_phone_2} />
                                        </Field>
                                        <Field>
                                            <FieldLabel>
                                                Contacto Emergencia
                                            </FieldLabel>
                                            <Input type="text" name="emergency_contact_name" defaultValue={customer?.emergency_contact_name} />
                                        </Field>
                                        <Field>
                                            <FieldLabel>
                                                Teléfono Contacto Emergencia
                                            </FieldLabel>
                                            <Input type="phone" name="emergency_contact_phone" defaultValue={customer?.emergency_contact_phone} />
                                        </Field>
                                    </FieldGroup>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="m-8">
                            <CardHeader>
                                <CardTitle>Cómo nos conociste?</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6 lg:grid-cols-2">
                                    <FieldGroup>
                                        <Field orientation="horizontal">
                                            <Checkbox
                                                id="instagram"
                                                name="instagram"
                                                value="1"
                                                defaultChecked={customer?.instagram}
                                            />
                                            <FieldLabel
                                                htmlFor="instagram"
                                            >
                                                Instagram
                                            </FieldLabel>
                                        </Field>
                                        <Field orientation="horizontal">
                                            <Checkbox
                                                id="maps"
                                                name="maps"
                                                value="1"
                                                defaultChecked={customer?.maps}
                                            />
                                            <FieldLabel
                                                htmlFor="maps"
                                            >
                                                Google Maps
                                            </FieldLabel>
                                        </Field>
                                    </FieldGroup>
                                    <FieldGroup>
                                        <Field orientation="horizontal">
                                            <Checkbox
                                                id="mouth_mouth"
                                                name="mouth_mouth"
                                                value="1"
                                                defaultChecked={customer?.mouth_mouth}
                                            />
                                            <FieldLabel
                                                htmlFor="mouth_mouth"
                                            >
                                                Recomendación personal
                                            </FieldLabel>
                                        </Field>
                                        <Field orientation="horizontal">
                                            <FieldLabel>
                                                Otro
                                            </FieldLabel>
                                            <Input type="text" name="other_hear_about_us" defaultValue={customer?.other_hear_about_us} />
                                        </Field>
                                    </FieldGroup>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="m-8">
                            <CardHeader>
                                <CardTitle>
                                    Padecimientos, condiciones, etc
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <FieldGroup className="grid gap-6 grid-flow-column grid-cols-2 grid-rows-10">
                                    {
                                        diseaseFields.map((disease, i) => (
                                            <Field orientation="horizontal" key={i}>
                                                <Checkbox id={disease.key} name={disease.key} value="1" defaultChecked={customer?.[disease.key] as boolean} />
                                                <FieldLabel htmlFor={disease.key}>
                                                    {disease.label}
                                                </FieldLabel>
                                            </Field>
                                        ))
                                    }
                                </FieldGroup>
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
