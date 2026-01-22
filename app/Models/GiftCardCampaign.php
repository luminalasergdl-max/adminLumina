<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GiftCardCampaign extends Model
{
    use HasFactory;

    protected $table = 'gift_card_campaign';

    protected $fillable = [
        'campaign_name',
        'canva_design_url',
    ];
}
