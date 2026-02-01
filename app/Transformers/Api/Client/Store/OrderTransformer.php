<?php

namespace Trexzactyl\Transformers\Api\Client\Store;

use Trexzactyl\Models\ManualPayment;
use Trexzactyl\Transformers\Api\Client\BaseClientTransformer;

class OrderTransformer extends BaseClientTransformer
{
    /**
     * Return the resource name for the transformer.
     */
    public function getResourceName(): string
    {
        return 'order';
    }

    /**
     * Transform a manual payment into an order response.
     */
    public function transform(ManualPayment $payment): array
    {
        return [
            'id' => $payment->id,
            'user_id' => $payment->user_id,
            'amount' => $payment->credit_amount,
            'currency' => $payment->currency,
            'payment_method' => $this->getPaymentMethodName($payment->currency),
            'transaction_id' => $payment->transaction_id,
            'sender_number' => $payment->sender_number,
            'status' => $payment->status,
            'status_label' => $this->getStatusLabel($payment->status),
            'created_at' => $payment->created_at->toISOString(),
            'updated_at' => $payment->updated_at->toISOString(),
        ];
    }

    /**
     * Get a human-readable payment method name.
     */
    private function getPaymentMethodName(string $currency): string
    {
        return match ($currency) {
            'bkash' => 'bKash',
            'nagad' => 'Nagad',
            'stripe' => 'Stripe',
            'paypal' => 'PayPal',
            default => ucfirst($currency),
        };
    }

    /**
     * Get a human-readable status label.
     */
    private function getStatusLabel(string $status): string
    {
        return match ($status) {
            'pending' => 'Pending Review',
            'approved' => 'Approved',
            'rejected' => 'Rejected',
            default => ucfirst($status),
        };
    }
}