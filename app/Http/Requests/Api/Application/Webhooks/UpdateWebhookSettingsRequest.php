<?php

namespace Trexz\Http\Requests\Api\Application\Webhooks;

use Trexz\Models\AdminRole;
use Trexz\Http\Requests\Api\Application\ApplicationApiRequest;

class UpdateWebhookSettingsRequest extends ApplicationApiRequest
{
    public function permission(): string
    {
        return AdminRole::WEBHOOKS_UPDATE;
    }
}
