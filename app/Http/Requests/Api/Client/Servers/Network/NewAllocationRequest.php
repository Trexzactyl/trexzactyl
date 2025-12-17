<?php

namespace Trexz\Http\Requests\Api\Client\Servers\Network;

use Trexz\Models\Permission;
use Trexz\Http\Requests\Api\Client\ClientApiRequest;

class NewAllocationRequest extends ClientApiRequest
{
    public function permission(): string
    {
        return Permission::ACTION_ALLOCATION_CREATE;
    }
}
