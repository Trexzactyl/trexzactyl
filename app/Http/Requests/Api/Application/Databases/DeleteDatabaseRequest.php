<?php

namespace Trexz\Http\Requests\Api\Application\Databases;

use Trexz\Models\AdminRole;
use Trexz\Http\Requests\Api\Application\ApplicationApiRequest;

class DeleteDatabaseRequest extends ApplicationApiRequest
{
    public function permission(): string
    {
        return AdminRole::DATABASES_DELETE;
    }
}
