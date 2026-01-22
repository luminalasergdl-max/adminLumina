export type GiftCard = {
    id: number,
    gift_card_campaign_id: number,
    sender: string,
    receiver: string,
    receiver_phone: string,
    treatment_description: string,
    price: number,
    gift_card_message: string,
    valid_until: string,
    notes: string,
    redeemed: boolean,
    created_at: string
}
