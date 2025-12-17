<?php

namespace Trexz\Http\Requests\Api\Application\Users;

use Trexz\Models\AdminRole;
use Trexz\Http\Requests\Api\Application\ApplicationApiRequest;

class GetUsersRequest extends ApplicationApiRequest
{
    public function permission(): string
    {
        return AdminRole::USERS_READ;
    }
}
