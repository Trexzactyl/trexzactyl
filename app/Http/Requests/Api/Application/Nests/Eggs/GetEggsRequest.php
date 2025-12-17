<?php

namespace Trexz\Http\Requests\Api\Application\Nests\Eggs;

use Trexz\Services\Acl\Api\AdminAcl;
use Trexz\Http\Requests\Api\Application\ApplicationApiRequest;

class GetEggsRequest extends ApplicationApiRequest
{
    protected ?string $resource = AdminAcl::RESOURCE_EGGS;

    protected int $permission = AdminAcl::READ;
}
