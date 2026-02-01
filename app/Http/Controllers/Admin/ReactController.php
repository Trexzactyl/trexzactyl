<?php

namespace Trexzactyl\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Trexzactyl\Http\Controllers\Controller;

class ReactController extends Controller
{
    /**
     * Display the React admin panel.
     */
    public function index(Request $request)
    {
        return view('admin.react');
    }
}