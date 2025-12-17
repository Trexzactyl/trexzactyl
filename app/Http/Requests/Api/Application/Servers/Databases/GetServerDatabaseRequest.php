<?php

namespace Trexz\Http\Requests\Api\Application\Servers\Databases;

use Trexz\Models\AdminRole;
use Trexz\Http\Requests\Api\Application\ApplicationApiRequest;

class GetServerDatabaseRequest extends ApplicationApiRequest
{
    public function permission(): string
    {
        return AdminRole::SERVERS_READ;
    }
}
