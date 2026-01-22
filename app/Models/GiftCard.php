<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GiftCard extends Model
{
    use HasFactory;

    protected $table = 'gift_card';

    protected $fillable = [
        'gift_card_campaign_id',
        'sender',
        'receiver',
        'receiver_phone',
        'treatment_description',
        'price',
        'gift_card_message',
        'valid_until',
        'notes',
        'redeemed',
    ];

    protected $casts = [
        'price' => 'integer',
        'valid_until' => 'datetime',
        'redeemed' => 'boolean',
    ];

    /**
     * @return BelongsTo<GiftCardCampaign, GiftCard>
     */
    public function giftCardCampaign(): BelongsTo
    {
        return $this->belongsTo(GiftCardCampaign::class);
    }
}
