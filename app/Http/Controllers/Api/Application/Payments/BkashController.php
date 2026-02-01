<?php

namespace Trexzactyl\Http\Controllers\Api\Application\Payments;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Trexzactyl\Models\Bkash;
use Trexzactyl\Http\Controllers\Api\Application\ApplicationApiController;
use Trexzactyl\Transformers\Api\Application\BkashTransformer;

class BkashController extends ApplicationApiController
{
    /**
     * Return all bKash transactions with pagination.
     */
    public function index(Request $request): JsonResponse
    {
        $perPage = (int) $request->get('per_page', 50);
        if ($perPage < 1 || $perPage > 100) {
            $perPage = 50;
        }

        $transactions = Bkash::with('user')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);

        return $this->fractal->collection($transactions)
            ->transformWith($this->getTransformer(BkashTransformer::class))
            ->toArray();
    }

    /**
     * Approve a bKash transaction.
     */
    public function approve(Request $request, Bkash $transaction): JsonResponse
    {
        if ($transaction->status !== 'pending') {
            return response()->json(['error' => 'Transaction has already been processed'], 400);
        }

        $transaction->status = 'approved';
        $transaction->save();

        // Add credits to user
        $user = $transaction->user;
        $user->store_balance += $transaction->amount;
        $user->save();

        return $this->fractal->item($transaction)
            ->transformWith($this->getTransformer(BkashTransformer::class))
            ->toArray();
    }

    /**
     * Reject a bKash transaction.
     */
    public function reject(Request $request, Bkash $transaction): JsonResponse
    {
        $transaction->status = 'rejected';
        $transaction->rejection_reason = $request->input('reason');
        $transaction->save();

        return $this->fractal->item($transaction)
            ->transformWith($this->getTransformer(BkashTransformer::class))
            ->toArray();
    }
}