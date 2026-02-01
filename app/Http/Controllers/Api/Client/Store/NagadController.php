<?php

namespace Trexzactyl\Http\Controllers\Api\Client\Store;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\RedirectResponse;
use Trexzactyl\Exceptions\DisplayException;
use Trexzactyl\Http\Controllers\Api\Client\ClientApiController;
use Trexzactyl\Http\Requests\Api\Client\Store\Gateways\NagadRequest;

class NagadController extends ClientApiController
{
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Initiates a Nagad payment request.
     *
     * @throws DisplayException
     */
    public function purchase(NagadRequest $request): JsonResponse
    {
        if ($this->settings->get('Trexzactyl::store:nagad:enabled') != 'true') {
            throw new DisplayException('Unable to purchase via Nagad: module not enabled');
        }

        $amount = $request->input('amount');
        $conversionRate = $this->settings->get('Trexzactyl::store:conversion_rate', 115);
        $cost = $amount * $conversionRate;
        $nagadNumber = $this->settings->get('Trexzactyl::store:nagad:number');

        if (!$nagadNumber) {
            throw new DisplayException('Nagad payment number not configured');
        }

        // Create pending transaction
        $transaction = DB::table('nagad')->insertGetId([
            'user_id' => $request->user()->id,
            'amount' => $amount,
            'status' => 'pending',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return new JsonResponse([
            'transaction_id' => $transaction,
            'amount' => $amount,
            'cost_bdt' => $cost,
            'nagad_number' => $nagadNumber,
            'message' => 'Please send ' . $cost . ' BDT to ' . $nagadNumber . ' via Nagad and submit the transaction ID',
        ]);
    }

    /**
     * Verify Nagad payment with transaction ID.
     *
     * @throws DisplayException
     */
    public function verify(Request $request): JsonResponse
    {
        $user = $request->user();
        $transactionId = $request->input('transaction_id');
        $nagadTrxId = $request->input('nagad_transaction_id');

        $transaction = DB::table('nagad')
            ->where('id', $transactionId)
            ->where('user_id', $user->id)
            ->where('status', 'pending')
            ->first();

        if (!$transaction) {
            throw new DisplayException('Transaction not found or already processed');
        }

        // Update transaction with Nagad TrxID (admin will verify manually)
        DB::table('nagad')
            ->where('id', $transactionId)
            ->update([
                'transaction_id' => $nagadTrxId,
                'updated_at' => now(),
            ]);

        return new JsonResponse([
            'message' => 'Transaction submitted for verification. Credits will be added after admin approval.',
        ]);
    }
}
