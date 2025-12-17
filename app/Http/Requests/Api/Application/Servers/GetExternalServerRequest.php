<?php

namespace Trexz\Http\Requests\Api\Application\Servers;

use Trexz\Models\AdminRole;
use Trexz\Http\Requests\Api\Application\ApplicationApiRequest;

class GetExternalServerRequest extends ApplicationApiRequest
{
    public function permission(): string
    {
        return AdminRole::SERVERS_READ;
    }
}
