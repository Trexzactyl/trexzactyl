<?php

namespace Trexz\Http\Requests\Api\Application\Databases;

use Trexz\Models\AdminRole;
use Trexz\Models\DatabaseHost;
use Trexz\Http\Requests\Api\Application\ApplicationApiRequest;

class StoreDatabaseRequest extends ApplicationApiRequest
{
    public function rules(array $rules = null): array
    {
        return $rules ?? DatabaseHost::getRules();
    }

    public function permission(): string
    {
        return AdminRole::DATABASES_CREATE;
    }
}
