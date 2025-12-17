<?php

namespace Trexz\Http\Requests\Api\Application\Nests;

use Trexz\Models\Nest;
use Trexz\Models\AdminRole;
use Trexz\Http\Requests\Api\Application\ApplicationApiRequest;

class StoreNestRequest extends ApplicationApiRequest
{
    public function rules(array $rules = null): array
    {
        return $rules ?? Nest::getRules();
    }

    public function permission(): string
    {
        return AdminRole::NESTS_CREATE;
    }
}
