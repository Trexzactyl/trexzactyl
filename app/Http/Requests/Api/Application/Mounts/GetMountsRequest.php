<?php

namespace Trexz\Http\Requests\Api\Application\Mounts;

use Trexz\Models\AdminRole;
use Trexz\Http\Requests\Api\Application\ApplicationApiRequest;

class GetMountsRequest extends ApplicationApiRequest
{
    public function permission(): string
    {
        return AdminRole::MOUNTS_READ;
    }
}
