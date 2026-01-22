import AppLayout from "@/layouts/app-layout"

import { index as indexGiftCardCampaigns } from "@/routes/gift_card_campaign"

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

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { GiftCardCampaign } from "@/types/gift-card-campaign"

type GiftCardCampaignFormProps = {
    gift_card_campaign?: GiftCardCampaign
}

export default function GiftCardCampaignForm({ gift_card_campaign }: GiftCardCampaignFormProps) {
    const title = (gift_card_campaign ? 'Editar' : 'Nueva') + ' Campaña de Tarjeta'
    const action = gift_card_campaign ? `/gift_card_campaign/${gift_card_campaign.id}` : '/gift_card_campaign'
    const method = gift_card_campaign ? "put" : "post"

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Campañas',
            href: indexGiftCardCampaigns().url,
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
                                <CardTitle>Detalles de campaña</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6 lg:grid-cols-2">
                                    <FieldGroup>
                                        <Field>
                                            <FieldLabel>
                                                Nombre de campaña *
                                            </FieldLabel>
                                            <Input type="text" name="campaign_name" defaultValue={gift_card_campaign?.campaign_name} />
                                            {errors.campaign_name && <FieldError>Nombre de campaña obligatorio</FieldError>}
                                        </Field>
                                        <Field>
                                            <FieldLabel>
                                                URL de Canva
                                            </FieldLabel>
                                            <Input type="text" name="canva_design_url" defaultValue={gift_card_campaign?.canva_design_url} />
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
