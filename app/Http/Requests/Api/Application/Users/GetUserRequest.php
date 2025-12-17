<?php

namespace Trexz\Http\Requests\Api\Application\Users;

use Trexz\Models\AdminRole;

class GetUserRequest extends GetUsersRequest
{
    public function permission(): string
    {
        return AdminRole::USERS_READ;
    }
}
