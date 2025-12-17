<?php

namespace Trexz\Http\Requests\Api\Application\Tickets;

use Trexz\Models\AdminRole;
use Trexz\Http\Requests\Api\Application\ApplicationApiRequest;

class UpdateTicketSettingsRequest extends ApplicationApiRequest
{
    public function permission(): string
    {
        return AdminRole::TICKETS_UPDATE;
    }
}
