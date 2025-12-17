<?php

namespace Trexz\Http\Requests\Api\Application\Nests;

use Trexz\Models\AdminRole;

class GetNestRequest extends GetNestsRequest
{
    public function permission(): string
    {
        return AdminRole::NESTS_READ;
    }
}
