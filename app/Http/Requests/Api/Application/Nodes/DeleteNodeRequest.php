<?php

namespace Trexz\Http\Requests\Api\Application\Nodes;

use Trexz\Models\AdminRole;
use Trexz\Http\Requests\Api\Application\ApplicationApiRequest;

class DeleteNodeRequest extends ApplicationApiRequest
{
    public function permission(): string
    {
        return AdminRole::NODES_DELETE;
    }
}
