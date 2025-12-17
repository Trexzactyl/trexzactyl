<?php

namespace Trexz\Http\Requests\Api\Application\Auth;

use Trexz\Models\AdminRole;
use Trexz\Http\Requests\Api\Application\ApplicationApiRequest;

class EnableAuthModuleRequest extends ApplicationApiRequest
{
    public function permission(): string
    {
        return AdminRole::AUTH_CREATE;
    }
}
