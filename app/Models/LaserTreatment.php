<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LaserTreatment extends Model
{
    use HasFactory;

    protected $table = 'laser_treatment';

    protected $fillable = [
        'laser_category_id',
        'brief_description',
        'anatomic_place',
        'size',
        'years',
        'retouching',
        'laser',
        'surgery',
        'acid',
        'other',
        'notes',
        'photo_1',
        'photo_2',
        'photo_3',
        'finished',
    ];

    protected $casts = [
        'years' => 'integer',
        'retouching' => 'integer',
        'laser' => 'boolean',
        'surgery' => 'boolean',
        'acid' => 'boolean',
        'finished' => 'boolean'
    ];

    /**
     * @return BelongsTo<Customer, LaserTreatment>
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    /**
     * @return BelongsTo<LaserCategory, LaserTreatment>
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(LaserCategory::class, 'laser_category_id');
    }

    /**
     * @return HasMany<LaserSession>
     */
    public function laserSessions(): HasMany
    {
        return $this->hasMany(LaserSession::class);
    }
}
