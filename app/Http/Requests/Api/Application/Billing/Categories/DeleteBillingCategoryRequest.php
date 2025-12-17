<?php

namespace Trexz\Http\Requests\Api\Application\Billing\Categories;

use Trexz\Models\AdminRole;
use Trexz\Http\Requests\Api\Application\ApplicationApiRequest;

class DeleteBillingCategoryRequest extends ApplicationApiRequest
{
    public function permission(): string
    {
        return AdminRole::BILLING_CATEGORIES_DELETE;
    }
}
