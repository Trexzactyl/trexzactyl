<?php

namespace Trexz\Http\Requests\Api\Application\Webhooks;

use Trexz\Models\AdminRole;
use Trexz\Http\Requests\Api\Application\ApplicationApiRequest;

class GetWebhookEventsRequest extends ApplicationApiRequest
{
    public function permission(): string
    {
        return AdminRole::WEBHOOKS_READ;
    }
}
