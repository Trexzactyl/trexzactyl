<?php

namespace Trexz\Http\Requests\Api\Application\Nests;

use Trexz\Models\AdminRole;
use Trexz\Http\Requests\Api\Application\ApplicationApiRequest;

class GetNestsRequest extends ApplicationApiRequest
{
    public function permission(): string
    {
        return AdminRole::NESTS_READ;
    }
}
