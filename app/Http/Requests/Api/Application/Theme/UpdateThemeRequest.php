<?php

namespace Trexz\Http\Requests\Api\Application\Theme;

use Trexz\Models\AdminRole;
use Trexz\Http\Requests\Api\Application\ApplicationApiRequest;

class UpdateThemeRequest extends ApplicationApiRequest
{
    public function permission(): string
    {
        return AdminRole::SETTINGS_UPDATE;
    }
}
