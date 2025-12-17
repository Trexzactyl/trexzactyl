<?php

namespace Trexz\Http\Requests\Api\Client\Servers\Schedules;

use Trexz\Models\Permission;

class UpdateScheduleRequest extends StoreScheduleRequest
{
    public function permission(): string
    {
        return Permission::ACTION_SCHEDULE_UPDATE;
    }
}
