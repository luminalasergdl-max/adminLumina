<?php

namespace App\Http\Controllers;

use App\Models\Outcome;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OutcomesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $month = $request->query('month', \Carbon\Carbon::now()->month);
        $year = $request->query('year', \Carbon\Carbon::now()->year);

        return Inertia::render('outcomes/index', [
            'outcomes' => Outcome::whereRaw('MONTH(date) = ?', [$month])
                                 ->whereRaw('YEAR(date) = ?', [$year])
                                 ->orderBy('date', 'desc')
                                 ->get(),
            'month' => (int) $month,
            'year' => (int) $year,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('outcomes/form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'amount' => ['required', 'numeric'],
            'type' => ['required', 'in:fixed,variable'],
            'date' => ['required', 'date'],
        ]);

        $outcome = new Outcome();
        $outcome->fill($request->all());
        $outcome->save();

        return to_route('outcomes.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Outcome $outcome)
    {
        return Inertia::render('outcomes/show', [
            'outcome' => $outcome
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Outcome $outcome)
    {
        return Inertia::render('outcomes/form', [
            'outcome' => $outcome
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Outcome $outcome)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'amount' => ['required', 'numeric'],
            'type' => ['required', 'in:fixed,variable'],
            'date' => ['required', 'date'],
        ]);

        $outcome->update($request->all());

        return to_route('outcomes.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Outcome $outcome)
    {
        $outcome->delete();

        return to_route('outcomes.index');
    }
}
