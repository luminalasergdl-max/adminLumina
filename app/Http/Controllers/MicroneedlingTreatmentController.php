<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Inertia\Inertia;

use App\Models\Customer;
use App\Models\MicroneedlingTreatment;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;


class MicroneedlingTreatmentController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create(Customer $customer, Request $request)
    {
        return Inertia::render('microneedling-treatments/microneedling-treatment-form', [
            'customer' => $customer
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Customer $customer, Request $request)
    {
        $request->validate([
            'objective' => 'required',
        ]);

        $microneedlingTreatment = new MicroneedlingTreatment();
        $microneedlingTreatment->fill($request->input());

        if ($request->hasFile('photo')) {
            $uploadPath = "uploads/customers/customer_{$customer->id}";

            File::ensureDirectoryExists($uploadPath);

            foreach (range(0, 2) as $index) {
                $photoField = "photo_{$index}";
                if (isset($request->file('photo')[$index])) {
                    $file = $request->file('photo')[$index];
                    $path = $file->store($uploadPath, 'public');
                    $microneedlingTreatment->$photoField = $path;
                }
            }
        }

        $customer->microneedlingTreatments()->save($microneedlingTreatment);

        return to_route('customers.microneedling_treatments.show', parameters: [$customer, $microneedlingTreatment]);

    }

    /**
     * Display the specified resource.
     */
    public function show(Customer $customer, MicroneedlingTreatment $microneedlingTreatment)
    {
        $fullMicroneedlingTreatment = $microneedlingTreatment::with(relations:'microneedlingSessions')->find($microneedlingTreatment->id);

        return Inertia::render(component: 'microneedling-treatments/microneedling-treatment-show', props: [
            'customer' => $customer,
            'microneedling_treatment' => $fullMicroneedlingTreatment,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Customer $customer, MicroneedlingTreatment $microneedlingTreatment)
    {
        return Inertia::render('microneedling-treatments/microneedling-treatment-form', [
            'customer' => $customer,
            'microneedling_treatment' => $microneedlingTreatment,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Customer $customer, MicroneedlingTreatment $microneedlingTreatment, Request $request)
    {
        $request->validate([
            'objective' => 'required',
        ]);

        $microneedlingTreatment = MicroneedlingTreatment::findOrFail($microneedlingTreatment->id);

        if ($request->hasFile('photo')) {
        }

        $microneedlingTreatment->update($request->all());

        return to_route('customers.microneedling_treatments.show', parameters: [$customer, $microneedlingTreatment]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customer $customer, MicroneedlingTreatment $microneedlingTreatment)
    {
        $microneedlingTreatment = MicroneedlingTreatment::findOrFail(($microneedlingTreatment->id));

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
