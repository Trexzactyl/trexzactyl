<?php

namespace Trexz\Http\Requests\Api\Application\Nodes;

use Trexz\Models\AdminRole;

class GetNodeRequest extends GetNodesRequest
{
    public function permission(): string
    {
        return AdminRole::NODES_READ;
    }
}
