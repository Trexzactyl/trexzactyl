<?php

namespace Trexz\Http\Requests\Api\Application\Eggs;

use Trexz\Models\AdminRole;
use Trexz\Http\Requests\Api\Application\ApplicationApiRequest;

class GetEggsRequest extends ApplicationApiRequest
{
    public function permission(): string
    {
        return AdminRole::EGGS_READ;
    }
}
