<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('products/products-list', [
            'products' => Product::all()->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'brand' => $product->brand,
                    'presentation' => $product->presentation,
                    'unit_of_measurement' => $product->unit_of_measurement,
                    'minimum_stock' => $product->minimum_stock,
                    'notes' => $product->notes,
                    'edit_url' => route('products.edit', $product),
                    'delete_url' => route('products.destroy', $product),
                ];
            }),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('products/product-form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'brand' => ['required', 'string', 'max:100'],
            'presentation' => ['nullable', 'string', 'max:50'],
            'unit_of_measurement' => ['nullable', 'string', 'max:20'],
            'minimum_stock' => ['nullable', 'integer', 'min:0'],
            'notes' => ['nullable', 'string'],
        ]);

        $product = new Product();
        $product->fill($request->all());
        $product->save();

        return to_route('products.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $product = Product::findOrFail($id);

        return Inertia::render('products/product-show', [
            'product' => $product
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $product = Product::findOrFail($id);

        return Inertia::render('products/product-form', [
            'product' => $product
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'brand' => ['required', 'string', 'max:100'],
            'presentation' => ['nullable', 'string', 'max:50'],
            'unit_of_measurement' => ['nullable', 'string', 'max:20'],
            'minimum_stock' => ['nullable', 'integer', 'min:0'],
            'notes' => ['nullable', 'string'],
        ]);

        $product = Product::findOrFail($id);
        $product->update($request->all());

        return to_route('products.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return to_route('products.index');
    }
}
