<?php

namespace Trexz\Http\Requests\Api\Application\Billing;

use Trexz\Models\AdminRole;
use Trexz\Http\Requests\Api\Application\ApplicationApiRequest;

class DeleteStripeKeysRequest extends ApplicationApiRequest
{
    public function permission(): string
    {
        return AdminRole::BILLING_DELETE_KEYS;
    }
}
