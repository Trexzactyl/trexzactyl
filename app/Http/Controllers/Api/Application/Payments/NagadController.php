<?php

namespace Trexzactyl\Http\Controllers\Api\Application\Payments;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Trexzactyl\Models\Nagad;
use Trexzactyl\Http\Controllers\Api\Application\ApplicationApiController;
use Trexzactyl\Transformers\Api\Application\NagadTransformer;

class NagadController extends ApplicationApiController
{
    /**
     * Return all Nagad transactions with pagination.
     */
    public function index(Request $request): JsonResponse
    {
        $perPage = (int) $request->get('per_page', 50);
        if ($perPage < 1 || $perPage > 100) {
            $perPage = 50;
        }

        $transactions = Nagad::with('user')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);

        return $this->fractal->collection($transactions)
            ->transformWith($this->getTransformer(NagadTransformer::class))
            ->toArray();
    }

    /**
     * Approve a Nagad transaction.
     */
    public function approve(Request $request, Nagad $transaction): JsonResponse
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
            ->transformWith($this->getTransformer(NagadTransformer::class))
            ->toArray();
    }

    /**
     * Reject a Nagad transaction.
     */
    public function reject(Request $request, Nagad $transaction): JsonResponse
    {
        $transaction->status = 'rejected';
        $transaction->rejection_reason = $request->input('reason');
        $transaction->save();

        return $this->fractal->item($transaction)
            ->transformWith($this->getTransformer(NagadTransformer::class))
            ->toArray();
    }
}