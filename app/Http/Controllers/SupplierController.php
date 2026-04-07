<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Supplier;

class SupplierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('suppliers/suppliers-list', [
            'suppliers' => Supplier::all()->map(function ($supplier) {
                return [
                    'supplier_id' => $supplier->supplier_id,
                    'supplier_name' => $supplier->supplier_name,
                    'contact_name' => $supplier->contact_name,
                    'phone' => $supplier->phone,
                    'email' => $supplier->email,
                    'notes' => $supplier->notes,
                    'edit_url' => route('suppliers.edit', $supplier),
                    'delete_url' => route('suppliers.destroy', $supplier),
                ];
            }),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('suppliers/supplier-form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'supplier_name' => ['required', 'string', 'max:100'],
            'contact_name' => ['nullable', 'string', 'max:100'],
            'phone' => ['nullable', 'string', 'max:20'],
            'email' => ['nullable', 'string', 'email', 'max:100'],
            'address' => ['nullable', 'string'],
            'notes' => ['nullable', 'string'],
        ]);

        $supplier = new Supplier();
        $supplier->fill($request->all());
        $supplier->save();

        return to_route('suppliers.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $supplier = Supplier::findOrFail($id);

        return Inertia::render('suppliers/supplier-show', [
            'supplier' => $supplier
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $supplier = Supplier::findOrFail($id);

        return Inertia::render('suppliers/supplier-form', [
            'supplier' => $supplier
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'supplier_name' => ['required', 'string', 'max:100'],
            'contact_name' => ['nullable', 'string', 'max:100'],
            'phone' => ['nullable', 'string', 'max:20'],
            'email' => ['nullable', 'string', 'email', 'max:100'],
            'address' => ['nullable', 'string'],
            'notes' => ['nullable', 'string'],
        ]);

        $supplier = Supplier::findOrFail($id);
        $supplier->update($request->all());

        return to_route('suppliers.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $supplier = Supplier::findOrFail($id);
        $supplier->delete();

        return to_route('suppliers.index');
    }
}
