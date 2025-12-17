<?php

namespace Trexz\Http\Requests\Api\Application\Tickets;

use Trexz\Models\Ticket;
use Trexz\Models\AdminRole;
use Trexz\Http\Requests\Api\Application\ApplicationApiRequest;

class StoreTicketRequest extends ApplicationApiRequest
{
    public function rules(): array
    {
        return Ticket::rules();
    }

    public function permission(): string
    {
        return AdminRole::TICKETS_CREATE;
    }
}
