<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;


use App\Models\Customer;
use App\Models\LaserTreatment;
use App\Models\Package;

class PackageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('packages/packages-list', [
            'packages' => Package::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Customer $customer, LaserTreatment $laserTreatment, Request $request)
    {
        return Inertia::render('packages/package-form', [
            'customer' => $customer,
            'laser_treatment' => $laserTreatment
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Customer $customer, LaserTreatment $laserTreatment, Request $request)
    {
        $packages = new Package();

        $request->validate([
            'package_name' => ['required', 'string', 'max:100'],
            'package_price' => ['required', 'integer'],
            'package_sessions_total' => ['required', 'integer'],
            'notes' => ['nullable', 'string'],
        ]);

        $package = new Package();
        $package->fill($request->all());

        $laserTreatment->packages()->save($package);


        return to_route('customers.laser_treatments.packages.show', parameters: [$customer, $laserTreatment, $package]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Customer $customer, LaserTreatment $laserTreatment, Package $package, Request $request)
    {
        $session_index = $request->query('session_index');

        return Inertia::render(component: 'packages/package-show', props: [
            'customer' => $customer,
            'laser_treatment' => $laserTreatment,
            'package' => $package,
            'session_index' => $session_index,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Customer $customer, LaserTreatment $laserTreatment, Package $package)
    {
        return Inertia::render('packages/package-form', [
            'customer' => $customer,
            'laser_treatment' => $laserTreatment,
            'package' => $package
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Customer $customer, LaserTreatment $laserTreatment, Package $package, Request $request)
    {
        $package = Package::findOrFail($package->id);
        $package->update($request->all());

        return to_route('customers.laser_treatments.packages.show', parameters: [$customer, $laserTreatment, $package]);
    }

 /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customer $customer, LaserTreatment $laserTreatment, Package $package)
    {
        $package = Package::findOrFail($package->id);
        $package->delete();

        return to_route('customers.laser_treatments.show', parameters: [$customer, $laserTreatment]);
    }   
}
