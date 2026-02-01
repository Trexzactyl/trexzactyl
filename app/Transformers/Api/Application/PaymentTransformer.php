<?php

namespace Trexzactyl\Transformers\Api\Application;

use Trexzactyl\Models\ManualPayment;
use Trexzactyl\Transformers\Api\Application\BaseTransformer;

class PaymentTransformer extends BaseTransformer
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
        return 'payment';
    }

    /**
     * Transform a ManualPayment model into a representation for the application API.
     */
    public function transform(ManualPayment $payment): array
    {
        return [
            'id' => $payment->id,
            'user_id' => $payment->user_id,
            'credit_amount' => $payment->credit_amount,
            'currency' => $payment->currency,
            'transaction_id' => $payment->transaction_id,
            'sender_number' => $payment->sender_number,
            'status' => $payment->status,
            'rejection_reason' => $payment->rejection_reason,
            'created_at' => $payment->created_at->toISOString(),
            'updated_at' => $payment->updated_at->toISOString(),
        ];
    }

    /**
     * Include the user relationship for the payment.
     */
    public function includeUser(ManualPayment $payment)
    {
        return $this->item($payment->user, $this->makeTransformer(UserTransformer::class), 'user');
    }
}