<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Inertia\Inertia;

use App\Models\Customer;
use App\Models\LaserCategory;
use App\Models\LaserTreatment;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

use Illuminate\Support\Facades\Log;

class LaserTreatmentController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create(Customer $customer, Request $request)
    {
        $laserCategories = LaserCategory::all();

        return Inertia::render('laser-treatments/laser-treatment-form', [
            'customer' => $customer,
            'laser_categories' => $laserCategories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Customer $customer, Request $request)
    {
        $request->validate([
            'laser_category_id' => 'required',
            'brief_description' => 'required',
            'years' => 'max_digits:2',
            'retouching' => 'max_digits:2',
        ]);

        $laserTreatment = new LaserTreatment();
        $laserTreatment->fill($request->input());

        if ($request->hasFile('photo')) {
            $uploadPath = "uploads/customers/customer_{$customer->id}";

            File::ensureDirectoryExists($uploadPath);

            foreach (range(0, 2) as $index) {
                $photoField = "photo_{$index}";
                if (isset($request->file('photo')[$index])) {
                    $file = $request->file('photo')[$index];
                    $path = $file->store($uploadPath, 'public');
                    $laserTreatment->$photoField = $path;
                }
            }
        }

        $customer->laserTreatments()->save($laserTreatment);

        return to_route('customers.laser_treatments.show', parameters: [$customer, $laserTreatment]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Customer $customer, LaserTreatment $laserTreatment)
    {
        $laserCategories = LaserCategory::all();

        $fullLaserTreatment = $laserTreatment::with(relations: 'laserSessions')->find($laserTreatment->id);

        return Inertia::render(component: 'laser-treatments/laser-treatment-show', props: [
            'customer' => $customer,
            'laser_treatment' => $fullLaserTreatment,
            'laser_categories' => $laserCategories
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Customer $customer, LaserTreatment $laserTreatment)
    {
        $laserCategories = LaserCategory::all();

        return Inertia::render('laser-treatments/laser-treatment-form', [
            'customer' => $customer,
            'laser_treatment' => $laserTreatment,
            'laser_categories' => $laserCategories
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Customer $customer, LaserTreatment $laserTreatment, Request $request)
    {
        $request->validate([
            'laser_category_id' => 'required',
            'brief_description' => 'required',
            'years' => 'max_digits:2',
            'retouching' => 'max_digits:2',
        ]);

        $laserTreatment = LaserTreatment::findOrFail($laserTreatment->id);

        if ($request->hasFile('photo')) {
        }

        $laserTreatment->update($request->all());

        return to_route('customers.laser_treatments.show', parameters: [$customer, $laserTreatment]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customer $customer, LaserTreatment $laserTreatment)
    {
        $laserTreatment = LaserTreatment::findOrFail($laserTreatment->id);

        foreach (range(0, 2) as $index) {
            $photoField = "photo_{$index}";

            if ($laserTreatment->$photoField && Storage::disk('public')->exists($laserTreatment->$photoField)) {
                Storage::disk('public')->delete($laserTreatment->$photoField);
            }
        }

        $laserTreatment->delete();
        return to_route('customers.show', [$customer]);
    }

    public function markAsFinished(Request $request, $id, $customerId)
    {
        $laserTreatment = LaserTreatment::findOrFail(id: $id);
        $customer = Customer::findOrFail(id: $customerId);

        Log::info('{request}', ['request' => $request]);

        if ($request->only('finished') == true) {
            $laserTreatment->update(['finished' => true]);
        }

        return to_route('customers.laser_treatments.show', [$customer, $laserTreatment]);
    }
}
