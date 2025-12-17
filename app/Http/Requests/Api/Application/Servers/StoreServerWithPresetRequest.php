<?php

namespace Trexz\Http\Requests\Api\Application\Servers;

use Trexz\Models\AdminRole;
use Trexz\Http\Requests\Api\Application\ApplicationApiRequest;

class StoreServerWithPresetRequest extends ApplicationApiRequest
{
    public function rules(): array
    {
        return [
            'preset_id' => 'required|exists:server_presets,id',
            'node_id' => 'required|exists:nodes,id',
        ];
    }

    public function permission(): string
    {
        return AdminRole::SERVERS_CREATE;
    }
}
