<?php

namespace Trexz\Http\Requests\Api\Application\Api;

use Trexz\Models\AdminRole;
use Trexz\Http\Requests\Api\Application\ApplicationApiRequest;

class GetApplicationApiKeysRequest extends ApplicationApiRequest
{
    public function permission(): string
    {
        return AdminRole::API_READ;
    }
}
