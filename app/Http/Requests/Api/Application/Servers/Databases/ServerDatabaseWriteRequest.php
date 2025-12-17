<?php

namespace Trexz\Http\Requests\Api\Application\Servers\Databases;

use Trexz\Models\AdminRole;

class ServerDatabaseWriteRequest extends GetServerDatabasesRequest
{
    public function permission(): string
    {
        return AdminRole::SERVERS_UPDATE;
    }
}
