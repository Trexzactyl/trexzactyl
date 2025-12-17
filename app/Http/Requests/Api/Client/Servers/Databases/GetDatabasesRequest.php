<?php

namespace Trexz\Http\Requests\Api\Client\Servers\Databases;

use Trexz\Models\Permission;
use Trexz\Contracts\Http\ClientPermissionsRequest;
use Trexz\Http\Requests\Api\Client\ClientApiRequest;

class GetDatabasesRequest extends ClientApiRequest implements ClientPermissionsRequest
{
    public function permission(): string
    {
        return Permission::ACTION_DATABASE_READ;
    }
}
