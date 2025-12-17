<?php

namespace Trexz\Http\Requests\Api\Application\Billing\Exceptions;

use Trexz\Models\AdminRole;
use Trexz\Http\Requests\Api\Application\ApplicationApiRequest;

class ResolveBillingExceptionRequest extends ApplicationApiRequest
{
    public function permission(): string
    {
        return AdminRole::BILLING_EXCEPTIONS;
    }
}
