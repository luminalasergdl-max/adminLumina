import AppLayout from "@/layouts/app-layout"
import { index } from "@/routes/outcomes"

import { type BreadcrumbItem } from "@/types"
import { Head, Form } from "@inertiajs/react"

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

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Textarea } from "@/components/ui/textarea"

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Outcome } from "@/types/outcome"

type OutcomeFormProps = {
    outcome?: Outcome
}

export default function OutcomeForm({ outcome }: OutcomeFormProps) {
    const title = (outcome ? 'Editar' : 'Nuevo') + ' Egreso'
    const action = outcome ? `/outcomes/${outcome.id}` : '/outcomes'
    const method = outcome ? "put" : "post"

    // Set today for default date input
    const today = new Date().toISOString().split('T')[0];

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Finanzas',
            href: '/finances',
        },
        {
            title: 'Egresos',
            href: index().url,
        },
        {
            title,
            href: '',
        },
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <Form action={action} method={method}>
                {({ errors }) => (
                    <>
                        <Card className="m-8">
                            <CardHeader>
                                <CardTitle>Detalles del Egreso</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6 lg:grid-cols-2">
                                    <FieldGroup>
                                        <Field>
                                            <FieldLabel>
                                                Nombre *
                                            </FieldLabel>
                                            <Input type="text" name="name" defaultValue={outcome?.name} required />
                                            {errors.name && <FieldError>{errors.name}</FieldError>}
                                        </Field>
                                        <Field>
                                            <FieldLabel>
                                                Monto *
                                            </FieldLabel>
                                            <Input type="number" step="0.01" min="0" name="amount" defaultValue={outcome?.amount} required />
                                            {errors.amount && <FieldError>{errors.amount}</FieldError>}
                                        </Field>
                                        <Field>
                                            <FieldLabel>
                                                Tipo *
                                            </FieldLabel>
                                            <Select
                                                defaultValue={outcome?.type ?? 'fixed'}
                                                name="type"
                                                required
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Selecciona un tipo" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="fixed">Fijo</SelectItem>
                                                    <SelectItem value="variable">Variable</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {errors.type && <FieldError>{errors.type}</FieldError>}
                                        </Field>
                                    </FieldGroup>
                                    <FieldGroup>
                                        <Field>
                                            <FieldLabel>
                                                Fecha *
                                            </FieldLabel>
                                            <Input
                                                type="date"
                                                name="date"
                                                defaultValue={outcome?.date ?? today}
                                                required
                                            />
                                            {errors.date && <FieldError>{errors.date}</FieldError>}
                                        </Field>
                                        <Field>
                                            <FieldLabel>
                                                Descripción
                                            </FieldLabel>
                                            <Textarea name="description" defaultValue={outcome?.description ?? ''} rows={4} />
                                            {errors.description && <FieldError>{errors.description}</FieldError>}
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
