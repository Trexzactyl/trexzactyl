<?php

namespace Trexzactyl\Http\Controllers\Api\Application\Payments;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Trexzactyl\Models\ManualPayment;
use Trexzactyl\Http\Controllers\Api\Application\ApplicationApiController;
use Trexzactyl\Transformers\Api\Application\PaymentTransformer;

class PaymentController extends ApplicationApiController
{
    /**
     * Return all manual payments with pagination.
     */
    public function index(Request $request): JsonResponse
    {
        $perPage = (int) $request->get('per_page', 50);
        if ($perPage < 1 || $perPage > 100) {
            $perPage = 50;
        }

        $payments = ManualPayment::with('user')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);

        return $this->fractal->collection($payments)
            ->transformWith($this->getTransformer(PaymentTransformer::class))
            ->toArray();
    }

    /**
     * Approve a manual payment.
     */
    public function approve(Request $request, ManualPayment $payment): JsonResponse
    {
        if ($payment->status !== 'pending') {
            return response()->json(['error' => 'Payment has already been processed'], 400);
        }

        $payment->status = 'approved';
        $payment->save();

        // Add credits to user
        $user = $payment->user;
        $user->store_balance += $payment->credit_amount;
        $user->save();

        return $this->fractal->item($payment)
            ->transformWith($this->getTransformer(PaymentTransformer::class))
            ->toArray();
    }

    /**
     * Reject a manual payment.
     */
    public function reject(Request $request, ManualPayment $payment): JsonResponse
    {
        $payment->status = 'rejected';
        $payment->rejection_reason = $request->input('reason');
        $payment->save();

        return $this->fractal->item($payment)
            ->transformWith($this->getTransformer(PaymentTransformer::class))
            ->toArray();
    }
}