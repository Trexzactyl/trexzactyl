<?php

namespace Trexz\Http\Requests\Api\Application\Roles;

use Trexz\Models\AdminRole;

class GetRoleRequest extends GetRolesRequest
{
    public function permission(): string
    {
        return AdminRole::ROLES_READ;
    }
}
