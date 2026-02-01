<?php

namespace Trexzactyl\Http\Controllers\Api\Client\Store;

use Illuminate\Http\JsonResponse;
use Trexzactyl\Models\ManualPayment;
use Trexzactyl\Http\Controllers\Api\Client\ClientApiController;
use Trexzactyl\Http\Requests\Api\Client\Store\StoreManualPaymentRequest;
use Trexzactyl\Transformers\Api\Client\Store\OrderTransformer;

class ManualPaymentController extends ClientApiController
{
    public function store(StoreManualPaymentRequest $request): JsonResponse
    {
        $user = $request->user();

        // Check if transaction ID already exists for this currency
        $existingPayment = ManualPayment::where('transaction_id', $request->input('transaction_id'))
            ->where('currency', $request->input('currency'))
            ->first();

        if ($existingPayment) {
            return response()->json([
                'error' => 'Transaction ID already exists for this payment method. Please use a unique transaction ID.'
            ], 422);
        }

        $payment = ManualPayment::create([
            'user_id' => $user->id,
            'credit_amount' => $request->input('amount'),
            'currency' => $request->input('currency'), // bkash or nagad
            'transaction_id' => $request->input('transaction_id'),
            'sender_number' => $request->input('sender_number'),
            'status' => 'pending',
        ]);

        return $this->fractal->item($payment)
            ->transformWith(OrderTransformer::class)
            ->toArray();
    }
}
