import AppLayout from '@/layouts/app-layout';

import { Head, Link } from '@inertiajs/react';

import {
    ItemGroup,
    Item,
    ItemContent,
    ItemDescription,
    ItemTitle,
} from "@/components/ui/item"

import {
    Button
} from "@/components/ui/button"

import { ButtonGroup } from "@/components/ui/button-group"

import { index as indexGiftCards, show, edit, destroy } from '@/routes/gift_card';

import { type BreadcrumbItem } from '@/types';

import { GiftCard } from '@/types/gift-card';
import { GiftCardCampaign } from '@/types/gift-card-campaign';

import { PencilIcon, Trash2Icon } from "lucide-react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type GiftCardShowProps = {
    gift_card: GiftCard
    giftCardCampaigns: GiftCardCampaign[]
}

export default function GiftCardShow({ gift_card, giftCardCampaigns }: GiftCardShowProps) {
    const title = `Tarjeta para ${gift_card.receiver}` || 'Tarjeta de regalo'
    const campaignName = giftCardCampaigns.find((campaign) => campaign.id === gift_card.gift_card_campaign_id)?.campaign_name

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Tarjetas de regalo',
            href: indexGiftCards().url,
        },
        {
            title,
            href: show(gift_card.id).url
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
                                {title}
                            </h2>
                            <ButtonGroup>
                                <Button variant="outline" size="icon" asChild>
                                    <Link href={edit(gift_card.id).url}><PencilIcon /></Link>
                                </Button>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="outline" size="icon"><Trash2Icon /></Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Confirmas que deseas borrar esta tarjeta?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Esta acción no puede ser deshecha.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                            <AlertDialogAction asChild>
                                                <Link href={destroy(gift_card.id)}>Sí, borrar</Link>
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </ButtonGroup>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div>
                                <ItemTitle className='mt-4'>
                                    Campaña
                                </ItemTitle>
                                <ItemDescription>
                                    {campaignName || '-'}
                                </ItemDescription>
                            </div>
                            <div>
                                <ItemTitle className='mt-4'>
                                    Emisor
                                </ItemTitle>
                                <ItemDescription>
                                    {gift_card.sender || '-'}
                                </ItemDescription>
                            </div>
                            <div>
                                <ItemTitle className='mt-4'>
                                    Receptor
                                </ItemTitle>
                                <ItemDescription>
                                    {gift_card.receiver || '-'}
                                </ItemDescription>
                            </div>
                            <div>
                                <ItemTitle className='mt-4'>
                                    Teléfono receptor
                                </ItemTitle>
                                <ItemDescription>
                                    {gift_card.receiver_phone || '-'}
                                </ItemDescription>
                            </div>
                            <div>
                                <ItemTitle className='mt-4'>
                                    Tratamiento
                                </ItemTitle>
                                <ItemDescription>
                                    {gift_card.treatment_description || '-'}
                                </ItemDescription>
                            </div>
                            <div>
                                <ItemTitle className='mt-4'>
                                    Precio
                                </ItemTitle>
                                <ItemDescription>
                                    {gift_card.price ?? '-'}
                                </ItemDescription>
                            </div>
                            <div>
                                <ItemTitle className='mt-4'>
                                    Válida hasta
                                </ItemTitle>
                                <ItemDescription>
                                    {gift_card.valid_until ? new Date(gift_card.valid_until).toLocaleString() : '-'}
                                </ItemDescription>
                            </div>
                            <div>
                                <ItemTitle className='mt-4'>
                                    Estado
                                </ItemTitle>
                                <ItemDescription>
                                    {gift_card.redeemed ? 'Usada' : 'Disponible'}
                                </ItemDescription>
                            </div>
                            <div className="md:col-span-2">
                                <ItemTitle className='mt-4'>
                                    Mensaje
                                </ItemTitle>
                                <ItemDescription className='line-clamp-none'>
                                    {gift_card.gift_card_message || '-'}
                                </ItemDescription>
                            </div>
                            <div className="md:col-span-2">
                                <ItemTitle className='mt-4'>
                                    Notas
                                </ItemTitle>
                                <ItemDescription className='line-clamp-none'>
                                    {gift_card.notes || '-'}
                                </ItemDescription>
                            </div>
                        </div>
                    </ItemContent>
                </Item>
            </ItemGroup>
        </AppLayout>
    )
}
