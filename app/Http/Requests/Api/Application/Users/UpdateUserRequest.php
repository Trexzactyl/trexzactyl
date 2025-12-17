<?php

namespace Trexz\Http\Requests\Api\Application\Users;

use Trexz\Models\User;
use Trexz\Models\AdminRole;

class UpdateUserRequest extends StoreUserRequest
{
    public function rules(array $rules = null): array
    {
        return parent::rules($rules ?? User::getRulesForUpdate($this->route()->parameter('user')));
    }

    public function permission(): string
    {
        return AdminRole::USERS_UPDATE;
    }
}
