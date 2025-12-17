<?php

namespace Trexz\Http\Requests\Api\Application\Databases;

use Trexz\Models\AdminRole;

class GetDatabaseRequest extends GetDatabasesRequest
{
    public function permission(): string
    {
        return AdminRole::DATABASES_READ;
    }
}
