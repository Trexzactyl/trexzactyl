<?php

namespace Trexz\Http\Requests\Api\Application\Billing\Products;

use Trexz\Models\AdminRole;
use Trexz\Http\Requests\Api\Application\ApplicationApiRequest;

class UpdateBillingProductRequest extends ApplicationApiRequest
{
    public function permission(): string
    {
        return AdminRole::BILLING_PRODUCTS_UPDATE;
    }
}
