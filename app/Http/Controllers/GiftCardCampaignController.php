<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\GiftCardCampaign;

class GiftCardCampaignController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('gift-card-campaigns/gift-card-campaigns-list', [
            'giftCardCampaigns' => GiftCardCampaign::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('gift-card-campaigns/gift-card-campaign-form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'campaign_name' => ['required', 'string', 'max:100'],
            'canva_design_url' => ['nullable', 'string', 'max:100'],
        ]);

        $giftCardCampaign = new GiftCardCampaign();
        $giftCardCampaign->fill($request->all());
        $giftCardCampaign->save();

        return to_route('gift_card_campaign.show', $giftCardCampaign);
    }

    /**
     * Display the specified resource.
     */
    public function show(GiftCardCampaign $giftCardCampaign)
    {
        return Inertia::render('gift-card-campaigns/gift-card-campaign-show', [
            'gift_card_campaign' => $giftCardCampaign,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(GiftCardCampaign $giftCardCampaign)
    {
        return Inertia::render('gift-card-campaigns/gift-card-campaign-form', [
            'gift_card_campaign' => $giftCardCampaign,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, GiftCardCampaign $giftCardCampaign)
    {
        $request->validate([
            'campaign_name' => ['required', 'string', 'max:100'],
            'canva_design_url' => ['nullable', 'string', 'max:100'],
        ]);

        $giftCardCampaign->update($request->all());

        return to_route('gift_card_campaign.show', $giftCardCampaign);
    }

}
