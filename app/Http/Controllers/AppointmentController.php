<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\Request;
use Inertia\Inertia;

use Spatie\GoogleCalendar\Event;

class AppointmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $events = Event::get();
        foreach ($events as $event) {
            //\Illuminate\Support\Facades\Log::info($event->id, ['start' => $event->name, 'end' => $event->summary]);
        }


        $appointments = Appointment::with('customer:id,full_name,contact_phone_1,contact_phone_2')->get();
        $customers = \App\Models\Customer::orderBy('full_name')->get(['id', 'full_name', 'contact_phone_1', 'contact_phone_2']);

        if ($request->wantsJson()) {
            return response()->json($appointments);
        }

        return Inertia::render('calendar/index', [
            'appointments' => $appointments,
            'customers' => $customers
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'customer_id' => ['nullable', 'exists:customer,id'],
            'start_date' => ['required', 'date'],
            'end_date' => ['required', 'date', 'after_or_equal:start_date'],
            'start_time' => ['required', 'string'],
            'end_time' => ['required', 'string'],
            'google_calendar_event_id' => ['nullable', 'string', 'max:255'],
            'is_blocked' => ['boolean'],
            'whatsapp_reminder_sent' => ['boolean'],
        ]);

        $appointment = new Appointment();
        $appointment->fill($request->all());
        $appointment->save();

        if ($request->wantsJson() || $request->headers->get('X-Inertia')) {
            return back();
        }

        return response()->json($appointment, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $appointment = Appointment::with('customer')->findOrFail($id);

        if (request()->wantsJson()) {
            return response()->json($appointment);
        }

        // Return to a generic view or handle differently since calendars usually don't have a show page
        return Inertia::render('appointments/show', [
            'appointment' => $appointment
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'customer_id' => ['nullable', 'exists:customer,id'],
            'start_date' => ['required', 'date'],
            'end_date' => ['required', 'date', 'after_or_equal:start_date'],
            'start_time' => ['required', 'string'],
            'end_time' => ['required', 'string'],
            'google_calendar_event_id' => ['nullable', 'string', 'max:255'],
            'is_blocked' => ['boolean'],
            'whatsapp_reminder_sent' => ['boolean'],
            'times_rescheduled' => ['nullable', 'integer', 'min:0'],
            'is_rescheduling' => ['nullable', 'boolean'],
        ]);

        $appointment = Appointment::findOrFail($id);
        $appointment->fill($request->all());

        if ($request->boolean('is_rescheduling')) {
            $appointment->times_rescheduled += 1;
        }

        $appointment->save();

        if ($request->wantsJson() || $request->headers->get('X-Inertia')) {
            return back();
        }

        return response()->json($appointment);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $appointment = Appointment::findOrFail($id);
        $appointment->delete();

        if (request()->wantsJson() || request()->headers->get('X-Inertia')) {
            return back();
        }

        return response()->json(null, 204);
    }
}
