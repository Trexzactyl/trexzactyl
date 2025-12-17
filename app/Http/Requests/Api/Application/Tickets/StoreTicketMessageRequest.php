<?php

namespace Trexz\Http\Requests\Api\Application\Tickets;

use Trexz\Models\AdminRole;
use Trexz\Models\TicketMessage;
use Trexz\Http\Requests\Api\Application\ApplicationApiRequest;

class StoreTicketMessageRequest extends ApplicationApiRequest
{
    public function rules(): array
    {
        return TicketMessage::rules();
    }

    public function permission(): string
    {
        return AdminRole::TICKETS_MESSAGE;
    }
}
