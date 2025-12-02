<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LaserCategory extends Model
{
    use HasFactory;

    protected $table = 'laser_category';

    public $timestamps = false;

    protected $fillable = [
        'name',
    ];

    /**
     * @return HasMany<LaserTreatment>
     */
    public function laserTreatments(): HasMany
    {
        return $this->hasMany(LaserTreatment::class);
    }
}
