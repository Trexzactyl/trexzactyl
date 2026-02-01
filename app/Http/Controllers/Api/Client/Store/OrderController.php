<?php

namespace Trexzactyl\Http\Controllers\Api\Client\Store;

use Illuminate\Http\Request;
use Trexzactyl\Http\Controllers\Controller;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $manual = $user->manualPayments()->get()->map(function ($item) {
            $item->gateway = 'Manual';
            $item->amount_display = $item->credit_amount;
            return $item;
        });

        $bkash = $user->bkash()->get()->map(function ($item) {
            $item->gateway = 'bKash';
            $item->amount_display = $item->amount . ' Credits';
            return $item;
        });

        $nagad = $user->nagad()->get()->map(function ($item) {
            $item->gateway = 'Nagad';
            $item->amount_display = $item->amount . ' Credits';
            return $item;
        });

        // Merge and sort desc by created_at
        $orders = $manual->concat($bkash)->concat($nagad)->sortByDesc('created_at')->values();

        return response()->json($orders);
    }
}
