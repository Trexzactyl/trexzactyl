<?php

namespace Trexz\Http\Requests\Api\Application\Eggs;

use Trexz\Models\AdminRole;
use Trexz\Http\Requests\Api\Application\ApplicationApiRequest;

class ImportEggRequest extends ApplicationApiRequest
{
    public function permission(): string
    {
        return AdminRole::EGGS_IMPORT;
    }
}
