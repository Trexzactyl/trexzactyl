<?php

namespace Trexz\Http\Requests\Api\Application\Servers\Presets;

use Trexz\Models\AdminRole;
use Trexz\Http\Requests\Api\Application\ApplicationApiRequest;

class GetServerPresetRequest extends ApplicationApiRequest
{
    public function permission(): string
    {
        return AdminRole::SERVER_PRESETS_READ;
    }
}
