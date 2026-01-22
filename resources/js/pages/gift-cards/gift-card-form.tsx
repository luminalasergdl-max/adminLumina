import AppLayout from "@/layouts/app-layout"

import { index } from "@/routes/gift_card"

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

import { Checkbox } from "@/components/ui/checkbox"

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { GiftCard } from "@/types/gift-card"
import { GiftCardCampaign } from "@/types/gift-card-campaign"

type GiftCardFormProps = {
    gift_card?: GiftCard
    gift_card_campaigns: GiftCardCampaign[]
}

export default function GiftCardForm({ gift_card, gift_card_campaigns }: GiftCardFormProps) {
    const title = (gift_card ? 'Editar' : 'Nueva') + ' Tarjeta de Regalo'
    const action = gift_card ? `/gift_card/${gift_card.id}` : '/gift_card'
    const method = gift_card ? "put" : "post"

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Tarjetas de regalo',
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
                                <CardTitle>Detalles de la tarjeta</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6 lg:grid-cols-2">
                                    <FieldGroup>
                                        <Field>
                                            <FieldLabel>
                                                Campaña *
                                            </FieldLabel>
                                            <Select
                                                defaultValue={gift_card?.gift_card_campaign_id.toString()}
                                                name="gift_card_campaign_id"
                                            >
                                                <SelectTrigger className="w-[240px]">
                                                    <SelectValue placeholder="Selecciona una campaña" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {gift_card_campaigns.map((campaign) => (
                                                        <SelectItem key={campaign.id} value={String(campaign.id)}>
                                                            {campaign.campaign_name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {errors.gift_card_campaign_id && <FieldError>Campaña obligatoria</FieldError>}
                                        </Field>
                                        <Field>
                                            <FieldLabel>
                                                Emisor
                                            </FieldLabel>
                                            <Input type="text" name="sender" defaultValue={gift_card?.sender} />
                                        </Field>
                                        <Field>
                                            <FieldLabel>
                                                Receptor
                                            </FieldLabel>
                                            <Input type="text" name="receiver" defaultValue={gift_card?.receiver} />
                                        </Field>
                                        <Field>
                                            <FieldLabel>
                                                Teléfono receptor
                                            </FieldLabel>
                                            <Input type="phone" name="receiver_phone" defaultValue={gift_card?.receiver_phone} />
                                        </Field>
                                        <Field>
                                            <FieldLabel>
                                                Tratamiento
                                            </FieldLabel>
                                            <Input type="text" name="treatment_description" defaultValue={gift_card?.treatment_description} />
                                        </Field>
                                        <Field>
                                            <FieldLabel>
                                                Precio
                                            </FieldLabel>
                                            <Input type="number" name="price" defaultValue={gift_card?.price} />
                                        </Field>
                                    </FieldGroup>
                                    <FieldGroup>
                                        <Field>
                                            <FieldLabel>
                                                Mensaje de la tarjeta
                                            </FieldLabel>
                                            <Textarea name="gift_card_message" defaultValue={gift_card?.gift_card_message} />
                                        </Field>
                                        <Field>
                                            <FieldLabel>
                                                Válida hasta
                                            </FieldLabel>
                                            <Input
                                                type="datetime-local"
                                                name="valid_until"
                                                defaultValue={gift_card?.valid_until?.slice(0, -8)}
                                            />
                                        </Field>
                                        <Field>
                                            <FieldLabel>
                                                Notas (Observaciones)
                                            </FieldLabel>
                                            <Textarea name="notes" defaultValue={gift_card?.notes} />
                                        </Field>
                                        <Field orientation="horizontal">
                                            <Checkbox
                                                id="redeemed"
                                                name="redeemed"
                                                value="1"
                                                defaultChecked={gift_card?.redeemed}
                                            />
                                            <FieldLabel htmlFor="redeemed">
                                                Tarjeta usada
                                            </FieldLabel>
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
