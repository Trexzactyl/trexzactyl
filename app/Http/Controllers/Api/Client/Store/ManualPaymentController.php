<?php

namespace Trexzactyl\Http\Controllers\Api\Client\Store;

use Trexzactyl\Models\ManualPayment;
use Trexzactyl\Http\Controllers\Api\Client\ClientApiController;
use Trexzactyl\Http\Requests\Api\Client\Store\StoreManualPaymentRequest;
use Illuminate\Http\JsonResponse;

class ManualPaymentController extends ClientApiController
{
    public function store(StoreManualPaymentRequest $request): JsonResponse
    {
        $user = $request->user();

        $payment = ManualPayment::create([
            'user_id' => $user->id,
            'credit_amount' => $request->input('amount'),
            'currency' => $request->input('currency'), // bkash or nagad
            'transaction_id' => $request->input('transaction_id'),
            'sender_number' => $request->input('sender_number'),
            'status' => 'pending',
        ]);

        // Optional: Send webhook to Discord/Admin here if configured.

        return new JsonResponse($payment, JsonResponse::HTTP_CREATED);
    }
}
