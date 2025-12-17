<?php

namespace Trexz\Http\Requests\Api\Application\Roles;

use Trexz\Models\AdminRole;
use Trexz\Http\Requests\Api\Application\ApplicationApiRequest;

class GetRolesRequest extends ApplicationApiRequest
{
    public function permission(): string
    {
        return AdminRole::ROLES_READ;
    }
}
