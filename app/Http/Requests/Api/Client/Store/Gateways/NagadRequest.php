<?php

namespace Trexzactyl\Http\Requests\Api\Client\Store\Gateways;

use Trexzactyl\Http\Requests\Api\Client\ClientApiRequest;

class NagadRequest extends ClientApiRequest
{
    public function rules(): array
    {
        return [
            'amount' => 'required|numeric|min:1',
        ];
    }
}
