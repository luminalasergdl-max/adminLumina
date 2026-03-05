<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LaserSession extends Model
{
    use HasFactory;

    protected $table = 'laser_session';

    protected $fillable = [
        'laser_treatment_id',
        'power',
        'header',
        'passes',
        'price',
        'notes',
        'date_hour',
        'photo_0',
        'photo_1',
        'photo_2',
        'package_id',
    ];

    protected $casts = [
        'passes' => 'integer',
        'price' => 'integer',
        'date_hour' => 'datetime',
    ];

    /**
     * @return BelongsTo<LaserTreatment, LaserSession>
     */
    public function laserTreatment(): BelongsTo
    {
        return $this->belongsTo(LaserTreatment::class);
    }
}
