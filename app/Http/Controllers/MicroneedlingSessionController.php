<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Inertia\Inertia;

use App\Models\Customer;
use App\Models\MicroneedlingSession;
use App\Models\MicroneedlingTreatment;


use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class MicroneedlingSessionController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create(Customer $customer, MicroneedlingTreatment $microneedlingTreatment, Request $request)
    {
        return Inertia::render('microneedling-sessions/microneedling-session-form', [
            'customer' => $customer,
            'microneedling_treatment' => $microneedlingTreatment
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Customer $customer, MicroneedlingTreatment $microneedlingTreatment, Request $request)
    {
        $microneedlingSession = new MicroneedlingSession();
        $microneedlingSession->fill($request->input());

        if ($request->hasFile('photo')) {
            $uploadPath = "uploads/customers/customer_{$customer->id}";

            File::ensureDirectoryExists($uploadPath);

            foreach (range(0, 2) as $index) {
                $photoField = "photo_{$index}";
                if (isset($request->file('photo')[$index])) {
                    $file = $request->file('photo')[$index];
                    $path = $file->store($uploadPath, 'public');
                    $microneedlingSession->$photoField = $path;
                }
            }
        }

        $microneedlingTreatment->microneedlingSessions()->save($microneedlingSession);


        return to_route('customers.microneedling_treatments.microneedling_sessions.show', parameters: [$customer, $microneedlingTreatment, $microneedlingSession]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Customer $customer, MicroneedlingTreatment $microneedlingTreatment, MicroneedlingSession $microneedlingSession, Request $request)
    {
        $session_index = $request->query('session_index');

        return Inertia::render(component: 'microneedling-sessions/microneedling-session-show', props: [
            'customer' => $customer,
            'microneedling_treatment' => $microneedlingTreatment,
            'microneedling_session' => $microneedlingSession,
            'session_index' => $session_index,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Customer $customer, MicroneedlingTreatment $microneedlingTreatment, MicroneedlingSession $microneedlingSession)
    {
        return Inertia::render('microneedling-sessions/microneedling-session-form', [
            'customer' => $customer,
            'microneedling_treatment' => $microneedlingTreatment,
            'microneedling_session' => $microneedlingSession
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Customer $customer, MicroneedlingTreatment $microneedlingTreatment, MicroneedlingSession $microneedlingSession, Request $request)
    {
        $microneedlingSession = MicroneedlingSession::findOrFail($microneedlingSession->id);
        $microneedlingSession->update($request->all());

        return to_route('customers.microneedling_treatments.microneedling_sessions.show', parameters: [$customer, $microneedlingTreatment, $microneedlingSession]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customer $customer, MicroneedlingTreatment $microneedlingTreatment)
    {
        $microneedlingTreatment = MicroneedlingTreatment::findOrFail($microneedlingTreatment->id);

        foreach (range(0, 2) as $index) {
            $photoField = "photo_{$index}";

            if ($microneedlingTreatment->$photoField && Storage::disk('public')->exists($microneedlingTreatment->$photoField)) {
                Storage::disk('public')->delete($microneedlingTreatment->$photoField);
            }
        }

        $microneedlingTreatment->delete();
        return to_route('customers.show', [$customer]);
    }
}
