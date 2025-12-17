<?php

namespace Trexz\Http\Requests\Api\Application\Auth;

use Trexz\Models\AdminRole;
use Trexz\Http\Requests\Api\Application\ApplicationApiRequest;

class DisableAuthModuleRequest extends ApplicationApiRequest
{
    public function permission(): string
    {
        return AdminRole::AUTH_DELETE;
    }
}
