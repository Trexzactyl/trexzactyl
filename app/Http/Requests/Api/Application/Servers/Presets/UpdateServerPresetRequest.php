<?php

namespace Trexz\Http\Requests\Api\Application\Servers\Presets;

use Trexz\Models\AdminRole;
use Trexz\Models\ServerPreset;
use Trexz\Http\Requests\Api\Application\ApplicationApiRequest;

class UpdateServerPresetRequest extends ApplicationApiRequest
{
    public function rules(): array
    {
        return ServerPreset::rules();
    }

    public function permission(): string
    {
        return AdminRole::SERVER_PRESETS_UPDATE;
    }
}
