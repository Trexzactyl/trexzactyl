<?php

namespace Trexz\Http\Requests\Api\Application\Mounts;

use Trexz\Models\AdminRole;

class GetMountRequest extends GetMountsRequest
{
    public function permission(): string
    {
        return AdminRole::MOUNTS_READ;
    }
}
