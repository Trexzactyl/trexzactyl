<?php

namespace Trexzactyl\Http\Requests\Api\Client\Store;

use Trexzactyl\Http\Requests\Api\Client\ClientApiRequest;

class StoreManualPaymentRequest extends ClientApiRequest
{
    public function rules(): array
    {
        return [
            'amount' => 'required|integer|min:1',
            'currency' => 'required|in:bkash,nagad',
            'transaction_id' => 'required|string|min:4',
            'sender_number' => 'required|string|min:4',
        ];
    }
}
