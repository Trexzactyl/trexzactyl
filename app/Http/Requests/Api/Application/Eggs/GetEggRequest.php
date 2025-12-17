<?php

namespace Trexz\Http\Requests\Api\Application\Eggs;

use Trexz\Models\AdminRole;

class GetEggRequest extends GetEggsRequest
{
    public function permission(): string
    {
        return AdminRole::EGGS_READ;
    }
}
