<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\GiftCard;
use App\Models\GiftCardCampaign;

class GiftCardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('gift-cards/gift-cards-list', [
            'giftCards' => GiftCard::all(),
            'giftCardCampaigns' => GiftCardCampaign::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('gift-cards/gift-card-form', [
            'gift_card_campaigns' => GiftCardCampaign::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'gift_card_campaign_id' => ['required', 'exists:gift_card_campaign,id'],
            'sender' => ['nullable', 'string', 'max:100'],
            'receiver' => ['nullable', 'string', 'max:100'],
            'receiver_phone' => ['nullable', 'string', 'max:50'],
            'treatment_description' => ['nullable', 'string', 'max:100'],
            'price' => ['nullable', 'integer'],
            'gift_card_message' => ['nullable', 'string', 'max:255'],
            'valid_until' => ['nullable', 'date'],
            'notes' => ['nullable', 'string'],
            'redeemed' => ['nullable', 'boolean'],
        ]);

        $giftCard = new GiftCard();
        $giftCard->fill($request->all());
        $giftCard->save();

        return to_route('gift_card.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(GiftCard $giftCard)
    {
        return Inertia::render('gift-cards/gift-card-show', [
            'gift_card' => $giftCard,
            'giftCardCampaigns' => GiftCardCampaign::all(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(GiftCard $giftCard)
    {
        return Inertia::render('gift-cards/gift-card-form', [
            'gift_card' => $giftCard,
            'gift_card_campaigns' => GiftCardCampaign::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, GiftCard $giftCard)
    {
        $request->validate([
            'gift_card_campaign_id' => ['required', 'exists:gift_card_campaign,id'],
            'sender' => ['nullable', 'string', 'max:100'],
            'receiver' => ['nullable', 'string', 'max:100'],
            'receiver_phone' => ['nullable', 'string', 'max:50'],
            'treatment_description' => ['nullable', 'string', 'max:100'],
            'price' => ['nullable', 'integer'],
            'gift_card_message' => ['nullable', 'string', 'max:255'],
            'valid_until' => ['nullable', 'date'],
            'notes' => ['nullable', 'string'],
            'redeemed' => ['nullable', 'boolean'],
        ]);

        $giftCard->update($request->all());

        return to_route('gift_card.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(GiftCard $giftCard)
    {
        $giftCard->delete();

        return to_route('gift_card.index');
    }

    public function markAsUsed(Request $request, $id)
    {
        $giftCard = GiftCard::findOrFail($id);
        $giftCard->update(['redeemed' => true]);

        return Inertia::render('gift-cards/gift-cards-list', [
            'giftCards' => GiftCard::all(),
            'giftCardCampaigns' => GiftCardCampaign::all(),
        ]);
    }
}