<?php

namespace Trexz\Http\Requests\Api\Application\Allocations;

use Trexz\Models\AdminRole;
use Trexz\Http\Requests\Api\Application\ApplicationApiRequest;

class DeleteAllocationRequest extends ApplicationApiRequest
{
    public function permission(): string
    {
        return AdminRole::NODES_UPDATE;
    }
}
