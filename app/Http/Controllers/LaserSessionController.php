<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Inertia\Inertia;

use App\Models\Customer;
use App\Models\LaserSession;
use App\Models\LaserTreatment;
use App\Models\Package;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Log;

class LaserSessionController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create(Customer $customer, LaserTreatment $laserTreatment, Request $request)
    {
        return Inertia::render('laser-sessions/laser-session-form', [
            'customer' => $customer,
            'laser_treatment' => $laserTreatment->load('packages')
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Customer $customer, LaserTreatment $laserTreatment, Request $request)
    {
        $laserSession = new LaserSession();
        $data = $request->all();
        if (!$request->has('package_id')) {
            $data['package_id'] = null;
        }
        $laserSession->fill($data);

        if ($request->hasFile('photo')) {
            $uploadPath = "uploads/customers/customer_{$customer->id}";

            File::ensureDirectoryExists($uploadPath);

            foreach (range(0, 2) as $index) {
                $photoField = "photo_{$index}";
                if (isset($request->file('photo')[$index])) {
                    $file = $request->file('photo')[$index];
                    $path = $file->store($uploadPath, 'public');
                    $laserSession->$photoField = $path;
                }
            }
        }

        $laserTreatment->laserSessions()->save($laserSession);

        if ($laserSession->package_id) {
            $package = Package::find($laserSession->package_id);
            if ($package) {
                $package->increment('package_sessions_used');
            }
        }


        return to_route('customers.laser_treatments.laser_sessions.show', parameters: [$customer, $laserTreatment, $laserSession]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Customer $customer, LaserTreatment $laserTreatment, LaserSession $laserSession, Request $request)
    {
        $session_index = $request->query('session_index');

        return Inertia::render(component: 'laser-sessions/laser-session-show', props: [
            'customer' => $customer,
            'laser_treatment' => $laserTreatment,
            'laser_session' => $laserSession,
            'session_index' => $session_index,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Customer $customer, LaserTreatment $laserTreatment, LaserSession $laserSession)
    {
        return Inertia::render('laser-sessions/laser-session-form', [
            'customer' => $customer,
            'laser_treatment' => $laserTreatment,
            'laser_session' => $laserSession
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Customer $customer, LaserTreatment $laserTreatment, LaserSession $laserSession, Request $request)
    {
        $laserSession = LaserSession::findOrFail($laserSession->id);
        $oldPackageId = $laserSession->package_id;

        $data = $request->all();
        if (!$request->has('package_id')) {
            $data['package_id'] = null;
        }
        $laserSession->update($data);

        $newPackageId = $laserSession->package_id;

        if ($oldPackageId !== $newPackageId) {
            if ($oldPackageId) {
                $oldPackage = Package::find($oldPackageId);
                if ($oldPackage) {
                    $oldPackage->decrement('package_sessions_used');
                }
            }
            if ($newPackageId) {
                $newPackage = Package::find($newPackageId);
                if ($newPackage) {
                    $newPackage->increment('package_sessions_used');
                }
            }
        }

        return to_route('customers.laser_treatments.laser_sessions.show', parameters: [$customer, $laserTreatment, $laserSession]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customer $customer, LaserTreatment $laserTreatment, LaserSession $laserSession)
    {
        $laserSession = LaserSession::findOrFail($laserSession->id);

        foreach (range(0, 2) as $index) {
            $photoField = "photo_{$index}";

            if ($laserSession->$photoField && Storage::disk('public')->exists($laserSession->$photoField)) {
                Storage::disk('public')->delete($laserSession->$photoField);
            }
        }

        if ($laserSession->package_id) {
            $package = Package::find($laserSession->package_id);
            if ($package) {
                $package->decrement('package_sessions_used');
            }
        }

        $laserSession->delete();

        return to_route('customers.laser_treatments.show', parameters: [$customer, $laserTreatment]);
    }
}
