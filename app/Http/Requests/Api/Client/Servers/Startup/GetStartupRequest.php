<?php

namespace Trexz\Http\Requests\Api\Client\Servers\Startup;

use Trexz\Models\Permission;
use Trexz\Http\Requests\Api\Client\ClientApiRequest;

class GetStartupRequest extends ClientApiRequest
{
    public function permission(): string
    {
        return Permission::ACTION_STARTUP_READ;
    }
}
