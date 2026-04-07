<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Customer extends Model
{
    protected $table = 'customer';

    protected $fillable = [
        'full_name',
        'gender',
        'birthdate',
        'contact_phone_1',
        'contact_phone_2',
        'email',
        'emergency_contact_name',
        'emergency_contact_phone',
        'zip_code',
        'instagram',
        'maps',
        'mouth_mouth',
        'other_hear_about_us',
        'diabetes',
        'hipertension',
        'epilepsia',
        'enfermedades_autoinmunes',
        'cancer_melanoma',
        'transtornos_coagulacion',
        'enfermedades_cardiacas',
        'infecciones_herpes_bacterianas_micoticas',
        'vih_inmunosupresion',
        'problemas_cicatrizacion',
        'enfermedades_piel',
        'retinoides_sistemicos',
        'photosensitizer',
        'alergias',
        'embarazo',
        'lactancia',
        'exposicion_solar_reciente',
        'camas_solares',
        'smokes',
        'drinks',
        'frequent_solar_exposure',
    ];

    protected $casts = [
        'birthdate' => 'date',
        'instagram' => 'boolean',
        'maps' => 'boolean',
        'mouth_mouth' => 'boolean',
        'diabetes' => 'boolean',
        'hipertension' => 'boolean',
        'epilepsia' => 'boolean',
        'enfermedades_autoinmunes' => 'boolean',
        'cancer_melanoma' => 'boolean',
        'transtornos_coagulacion' => 'boolean',
        'enfermedades_cardiacas' => 'boolean',
        'infecciones_herpes_bacterianas_micoticas' => 'boolean',
        'vih_inmunosupresion' => 'boolean',
        'problemas_cicatrizacion' => 'boolean',
        'enfermedades_piel' => 'boolean',
        'retinoides_sistemicos' => 'boolean',
        'photosensitizer' => 'boolean',
        'alergias' => 'boolean',
        'embarazo' => 'boolean',
        'lactancia' => 'boolean',
        'exposicion_solar_reciente' => 'boolean',
        'camas_solares' => 'boolean',
        'smokes' => 'boolean',
        'drinks' => 'boolean',
        'frequent_solar_exposure' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * @return HasMany<LaserTreatment>
     */
    public function laserTreatments(): HasMany
    {
        return $this->hasMany(LaserTreatment::class);
    }

    /**
     * @return HasMany<MicroneedlingTreatment>
     */
    public function microneedlingTreatments(): HasMany
    {
        return $this->hasMany(MicroneedlingTreatment::class);
    }

    /**
     * @return HasMany<Appointment>
     */
    public function appointments(): HasMany
    {
        return $this->hasMany(Appointment::class);
    }
}
