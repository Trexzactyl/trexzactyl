<?php

namespace Trexz\Http\Requests\Api\Application\Locations;

use Trexz\Services\Acl\Api\AdminAcl;
use Trexz\Http\Requests\Api\Application\ApplicationApiRequest;

class DeleteLocationRequest extends ApplicationApiRequest
{
    protected ?string $resource = AdminAcl::RESOURCE_LOCATIONS;

    protected int $permission = AdminAcl::WRITE;
}
