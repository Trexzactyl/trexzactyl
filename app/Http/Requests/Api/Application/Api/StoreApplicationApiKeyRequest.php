<?php

namespace Trexz\Http\Requests\Api\Application\Api;

use Trexz\Models\AdminRole;
use Trexz\Http\Requests\Api\Application\ApplicationApiRequest;

class StoreApplicationApiKeyRequest extends ApplicationApiRequest
{
    public function getKeyPermissions(): array
    {
        $arr = [];

        foreach ($this->all()['permissions'] as $key => $value) {
            $arr[$key] = $value;
        }

        return $arr;
    }

    public function permission(): string
    {
        return AdminRole::API_CREATE;
    }
}
