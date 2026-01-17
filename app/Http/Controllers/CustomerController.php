<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Inertia\Inertia;

use App\Models\Customer;
use App\Models\LaserCategory;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('customers/customers-list', [
            'customers' => Customer::all()->map(function ($customer) {
                return [
                    'id' => $customer->id,
                    'full_name' => $customer->full_name,
                    'email' => $customer->email,
                    'contact_phone_1' => $customer->contact_phone_1,
                    'contact_phone_2' => $customer->contact_phone_2,
                    'edit_url' => route(name: 'customers.edit', parameters: $customer),
                    'delete_url' => route('customers.destroy', $customer),
                ];
            }),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('customers/customer-form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'full_name' => ['required', 'string', 'max:255'],
            'contact_phone_1' => ['required'],
        ]);

        $customer = new Customer();
        $customer->fill($request->all());
        $customer->save();

        return to_route('customers.show', $customer);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $customer = Customer::with(relations: ['laserTreatments', 'microneedlingTreatments'])->find($id);
        $laserCategories = LaserCategory::all();

        return Inertia::render(component: 'customers/customer-show', props: [
            'customer' => $customer,
            'laser_categories' => $laserCategories
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $customer = Customer::findOrFail($id);

        return Inertia::render('customers/customer-form', [
            'customer' => $customer
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'full_name' => ['required', 'string', 'max:255'],
            'contact_phone_1' => ['required'],
        ]);

        $customer = Customer::findOrFail($id);

        $customer->update($request->all());

        return to_route('customers.show', $customer);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $customer = Customer::findOrFail($id);

        $customer->delete();

        return to_route('customers.index');
    }
}
