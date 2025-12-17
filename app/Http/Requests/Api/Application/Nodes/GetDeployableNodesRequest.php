<?php

namespace Trexz\Http\Requests\Api\Application\Nodes;

use Trexz\Models\AdminRole;

class GetDeployableNodesRequest extends GetNodesRequest
{
    public function rules(): array
    {
        return [
            'page' => 'integer',
            'memory' => 'required|integer|min:0',
            'disk' => 'required|integer|min:0',
            'location_ids' => 'array',
            'location_ids.*' => 'integer',
        ];
    }

    public function permission(): string
    {
        return AdminRole::NODES_READ;
    }
}
