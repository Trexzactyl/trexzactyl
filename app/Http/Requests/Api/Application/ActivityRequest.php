<?php

namespace Trexz\Http\Requests\Api\Application;

use Trexz\Models\AdminRole;

class ActivityRequest extends ApplicationApiRequest
{
    public function permission(): string
    {
        return AdminRole::ACTIVITY_READ;
    }
}
