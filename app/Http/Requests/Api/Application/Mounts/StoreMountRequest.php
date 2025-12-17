<?php

namespace Trexz\Http\Requests\Api\Application\Mounts;

use Trexz\Models\Mount;
use Trexz\Models\AdminRole;
use Trexz\Http\Requests\Api\Application\ApplicationApiRequest;

class StoreMountRequest extends ApplicationApiRequest
{
    public function rules(array $rules = null): array
    {
        return $rules ?? Mount::getRules();
    }

    public function permission(): string
    {
        return AdminRole::MOUNTS_CREATE;
    }
}
