<?php

namespace Trexz\Http\Requests\Api\Application\Users;

use Trexz\Models\User;
use Trexz\Models\AdminRole;
use Trexz\Http\Requests\Api\Application\ApplicationApiRequest;

class StoreUserRequest extends ApplicationApiRequest
{
    public function rules(array $rules = null): array
    {
        $rules = $rules ?? User::getRules();

        return collect($rules)->only([
            'external_id',
            'email',
            'username',
            'password',
            'admin_role_id',
            'root_admin',
        ])->toArray();
    }

    public function permission(): string
    {
        return AdminRole::USERS_CREATE;
    }
}
