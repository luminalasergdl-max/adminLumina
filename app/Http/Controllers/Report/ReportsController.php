<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;

class ReportsController extends Controller
{
    public function index()
    {
        return Inertia::render('customers/customers-list');
    }
}