<?php

namespace Trexzactyl\Http\Controllers\Api\Client\Store;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\RedirectResponse;
use Trexzactyl\Exceptions\DisplayException;
use Trexzactyl\Http\Controllers\Api\Client\ClientApiController;
use Trexzactyl\Http\Requests\Api\Client\Store\Gateways\BkashRequest;

class BkashController extends ClientApiController
{
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Initiates a bKash payment request.
     *
     * @throws DisplayException
     */
    public function purchase(BkashRequest $request): JsonResponse
    {
        if ($this->settings->get('Trexzactyl::store:bkash:enabled') != 'true') {
            throw new DisplayException('Unable to purchase via bKash: module not enabled');
        }

        $amount = $request->input('amount');
        $conversionRate = $this->settings->get('Trexzactyl::store:conversion_rate', 115);
        $cost = $amount * $conversionRate;
        $bkashNumber = $this->settings->get('Trexzactyl::store:bkash:number');

        if (!$bkashNumber) {
            throw new DisplayException('bKash payment number not configured');
        }

        // Create pending transaction
        $transaction = DB::table('bkash')->insertGetId([
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
            'bkash_number' => $bkashNumber,
            'message' => 'Please send ' . $cost . ' BDT to ' . $bkashNumber . ' via bKash and submit the transaction ID',
        ]);
    }

    /**
     * Verify bKash payment with transaction ID.
     *
     * @throws DisplayException
     */
    public function verify(Request $request): JsonResponse
    {
        $user = $request->user();
        $transactionId = $request->input('transaction_id');
        $bkashTrxId = $request->input('bkash_transaction_id');

        $transaction = DB::table('bkash')
            ->where('id', $transactionId)
            ->where('user_id', $user->id)
            ->where('status', 'pending')
            ->first();

        if (!$transaction) {
            throw new DisplayException('Transaction not found or already processed');
        }

        // Update transaction with bKash TrxID (admin will verify manually)
        DB::table('bkash')
            ->where('id', $transactionId)
            ->update([
                'transaction_id' => $bkashTrxId,
                'updated_at' => now(),
            ]);

        return new JsonResponse([
            'message' => 'Transaction submitted for verification. Credits will be added after admin approval.',
        ]);
    }
}
