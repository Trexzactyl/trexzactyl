<?php

namespace Trexz\Http\Requests\Api\Application\Billing\Config;

use Trexz\Models\AdminRole;
use Trexz\Http\Requests\Api\Application\ApplicationApiRequest;

class ExportBillingConfigRequest extends ApplicationApiRequest
{
    public function permission(): string
    {
        return AdminRole::BILLING_EXPORT;
    }
}
