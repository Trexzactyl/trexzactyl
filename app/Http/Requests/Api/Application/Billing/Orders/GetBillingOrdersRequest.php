<?php

namespace Trexz\Http\Requests\Api\Application\Billing\Orders;

use Trexz\Models\AdminRole;
use Trexz\Http\Requests\Api\Application\ApplicationApiRequest;

class GetBillingOrdersRequest extends ApplicationApiRequest
{
    public function permission(): string
    {
        return AdminRole::BILLING_ORDERS;
    }
}
