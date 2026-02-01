<?php

namespace Trexzactyl\Transformers\Api\Application;

use Trexzactyl\Models\Nagad;
use Trexzactyl\Transformers\Api\Application\BaseTransformer;

class NagadTransformer extends BaseTransformer
{
    /**
     * List of resources that can be included.
     */
    protected array $availableIncludes = ['user'];

    /**
     * Return the resource name for the transformer.
     */
    public function getResourceName(): string
    {
        return 'nagad_transaction';
    }

    /**
     * Transform a Nagad model into a representation for the application API.
     */
    public function transform(Nagad $transaction): array
    {
        return [
            'id' => $transaction->id,
            'user_id' => $transaction->user_id,
            'amount' => $transaction->amount,
            'transaction_id' => $transaction->transaction_id,
            'payment_id' => $transaction->payment_id,
            'status' => $transaction->status,
            'client_number' => $transaction->client_number,
            'rejection_reason' => $transaction->rejection_reason,
            'created_at' => $transaction->created_at->toISOString(),
            'updated_at' => $transaction->updated_at->toISOString(),
        ];
    }

    /**
     * Include the user relationship for the transaction.
     */
    public function includeUser(Nagad $transaction)
    {
        return $this->item($transaction->user, $this->makeTransformer(UserTransformer::class), 'user');
    }
}