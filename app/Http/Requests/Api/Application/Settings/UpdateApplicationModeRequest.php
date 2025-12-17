<?php

namespace Trexz\Http\Requests\Api\Application\Settings;

use Trexz\Models\AdminRole;
use Trexz\Http\Requests\Api\Application\ApplicationApiRequest;

class UpdateApplicationModeRequest extends ApplicationApiRequest
{
    public function rules(): array
    {
        return [
            'mode' => 'nullable|string|in:standard,personal',
        ];
    }

    public function permission(): string
    {
        return AdminRole::SETTINGS_UPDATE;
    }
}
