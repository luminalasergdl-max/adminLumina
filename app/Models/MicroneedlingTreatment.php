<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MicroneedlingTreatment extends Model
{
    use HasFactory;

    protected $table = 'microneedling_treatment';

    protected $fillable = [
        'objective',
        'anatomic_place',
        'previous_sessions',
        'laser',
        'surgery',
        'acid',
        'other',
        'activo',
        'notes',
        'photo_1',
        'photo_2',
        'photo_3',
    ];

    protected $casts = [
        'previous_sessions' => 'integer',
        'laser' => 'boolean',
        'surgery' => 'boolean',
        'acid' => 'boolean',
    ];

    /**
     * @return BelongsTo<Customer, MicroneedlingTreatment>
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    /**
     * @return HasMany<MicroneedlingSession>
     */
    public function microneedlingSessions(): HasMany
    {
        return $this->hasMany(MicroneedlingSession::class);
    }
}