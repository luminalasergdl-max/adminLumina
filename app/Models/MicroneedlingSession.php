<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MicroneedlingSession extends Model
{
    use HasFactory;

    protected $table = 'microneedling_session';

    protected $fillable = [
        'microneedling_treatment_id',
        'activo',
        'agujas',
        'price',
        'notes',
        'date_hour',
        'photo_0',
        'photo_1',
        'photo_2',
    ];

    protected $casts = [
        'price' => 'integer',
        'date_hour' => 'datetime',
    ];

    /**
     * @return BelongsTo<MicroneedlingTreatment, MicroneedlingSession>
     */
    public function microneedlingTreatment(): BelongsTo
    {
        return $this->belongsTo(MicroneedlingTreatment::class);
    }
}