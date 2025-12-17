<?php

namespace Trexz\Http\Requests\Api\Application\Webhooks;

use Trexz\Models\AdminRole;
use Trexz\Http\Requests\Api\Application\ApplicationApiRequest;

class ToggleWebhookEventRequest extends ApplicationApiRequest
{
    public function rules(): array
    {
        return [
            'id' => 'nullable|int|exists:webhook_events,id',
            'enabled' => 'required|bool',
        ];
    }

    public function permission(): string
    {
        return AdminRole::WEBHOOKS_UPDATE;
    }
}
