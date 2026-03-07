<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Package extends Model
{
    protected $table = 'package';

    protected $fillable = [
        'laser_treatment_id',
        'package_name',
        'package_price',
        'package_sessions_total',
        'package_sessions_used',
        'notes',
    ];

    public function laserTreatment(): BelongsTo
    {
        return $this->belongsTo(LaserTreatment::class);
    }

    /**
     * @return HasMany<LaserSession>
     */
    public function laserSessions(): HasMany
    {
        return $this->hasMany(LaserSession::class);
    }
}
