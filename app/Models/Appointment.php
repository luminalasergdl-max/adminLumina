<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Appointment extends Model
{
    /** @use HasFactory<\Database\Factories\AppointmentFactory> */
    use HasFactory;

    protected $table = 'appointment';

    protected $fillable = [
        'customer_id',
        'start_date',
        'end_date',
        'start_time',
        'end_time',
        'google_calendar_event_id',
        'is_blocked',
        'whatsapp_reminder_sent',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'is_blocked' => 'boolean',
        'whatsapp_reminder_sent' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * @return BelongsTo<Customer, $this>
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }
}
