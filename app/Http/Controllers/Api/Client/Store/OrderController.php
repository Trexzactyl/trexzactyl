<?php

namespace Trexzactyl\Http\Controllers\Api\Client\Store;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Trexzactyl\Models\ManualPayment;
use Trexzactyl\Http\Controllers\Controller;
use Trexzactyl\Transformers\Api\Client\Store\OrderTransformer;

class OrderController extends Controller
{
    /**
     * Get all orders for the authenticated user.
     */
    public function index(Request $request): JsonResponse
    {
        $orders = ManualPayment::where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return $this->fractal->collection($orders)
            ->transformWith(OrderTransformer::class)
            ->toArray();
    }

    /**
     * Get a specific order by ID.
     */
    public function show(Request $request, int $orderId): JsonResponse
    {
        $order = ManualPayment::where('user_id', $request->user()->id)
            ->where('id', $orderId)
            ->firstOrFail();

        return $this->fractal->item($order)
            ->transformWith(OrderTransformer::class)
            ->toArray();
    }

    /**
     * Get orders by status.
     */
    public function byStatus(Request $request, string $status): JsonResponse
    {
        $validStatuses = ['pending', 'approved', 'rejected'];
        
        if (!in_array($status, $validStatuses)) {
            return response()->json(['error' => 'Invalid status'], 400);
        }

        $orders = ManualPayment::where('user_id', $request->user()->id)
            ->where('status', $status)
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return $this->fractal->collection($orders)
            ->transformWith(OrderTransformer::class)
            ->toArray();
    }

    /**
     * Get orders by currency (payment method).
     */
    public function byCurrency(Request $request, string $currency): JsonResponse
    {
        $validCurrencies = ['bkash', 'nagad', 'stripe', 'paypal'];
        
        if (!in_array($currency, $validCurrencies)) {
            return response()->json(['error' => 'Invalid currency'], 400);
        }

        $orders = ManualPayment::where('user_id', $request->user()->id)
            ->where('currency', $currency)
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return $this->fractal->collection($orders)
            ->transformWith(OrderTransformer::class)
            ->toArray();
    }
}