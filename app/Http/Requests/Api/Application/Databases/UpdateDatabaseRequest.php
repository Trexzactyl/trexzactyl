<?php

namespace Trexz\Http\Requests\Api\Application\Databases;

use Trexz\Models\AdminRole;
use Trexz\Models\DatabaseHost;

class UpdateDatabaseRequest extends StoreDatabaseRequest
{
    public function rules(array $rules = null): array
    {
        return $rules ?? DatabaseHost::getRulesForUpdate($this->route()->parameter('databaseHost'));
    }

    public function permission(): string
    {
        return AdminRole::DATABASES_UPDATE;
    }
}
