<?php

namespace Trexz\Http\Requests\Api\Application\Billing\Config;

use Trexz\Models\AdminRole;
use Trexz\Http\Requests\Api\Application\ApplicationApiRequest;

class ImportBillingConfigRequest extends ApplicationApiRequest
{
    public function permission(): string
    {
        return AdminRole::BILLING_IMPORT;
    }
}
