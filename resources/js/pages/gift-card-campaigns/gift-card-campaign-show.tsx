import AppLayout from '@/layouts/app-layout';

import { Head, Link } from '@inertiajs/react';

import {
    ItemGroup,
    Item,
    ItemContent,
    ItemDescription,
    ItemTitle,
} from "@/components/ui/item"

import { index as indexGiftCardCampaigns, show, edit } from '@/routes/gift_card_campaign';

import { type BreadcrumbItem } from '@/types';

import { GiftCardCampaign } from '@/types/gift-card-campaign';

import { PencilIcon } from "lucide-react"

import {
    Button
} from "@/components/ui/button"

import { ButtonGroup } from "@/components/ui/button-group"

type GiftCardCampaignShowProps = {
    gift_card_campaign: GiftCardCampaign
}

export default function GiftCardCampaignShow({ gift_card_campaign }: GiftCardCampaignShowProps) {
    const title = gift_card_campaign.campaign_name || 'Campaña'

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Campañas',
            href: indexGiftCardCampaigns().url,
        },
        {
            title,
            href: show(gift_card_campaign.id).url
        },
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <ItemGroup className='m-8'>
                <Item variant="outline">
                    <ItemContent>
                        <div className='flex flex-row justify-between'>
                            <h2 className='text-xl md:text-3xl font-semibold'>
                                {gift_card_campaign.campaign_name || 'Campaña'}
                            </h2>
                            <ButtonGroup>
                                <Button variant="outline" size="icon" asChild>
                                    <Link href={edit(gift_card_campaign.id).url}><PencilIcon /></Link>
                                </Button>
                            </ButtonGroup>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div>
                                <ItemTitle className='mt-4'>
                                    URL de Canva
                                </ItemTitle>
                                <ItemDescription>
                                    {gift_card_campaign.canva_design_url || '-'}
                                </ItemDescription>
                            </div>
                        </div>
                    </ItemContent>
                </Item>
            </ItemGroup>
        </AppLayout>
    )
}
