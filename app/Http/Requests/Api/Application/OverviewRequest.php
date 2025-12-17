<?php

namespace Trexz\Http\Requests\Api\Application;

use Trexz\Models\AdminRole;

class OverviewRequest extends ApplicationApiRequest
{
    public function permission(): string
    {
        return AdminRole::OVERVIEW_READ;
    }
}
