<?php

namespace Trexz\Http\Requests\Api\Application\Mounts;

use Trexz\Models\Mount;
use Trexz\Models\AdminRole;

class UpdateMountRequest extends StoreMountRequest
{
    public function rules(array $rules = null): array
    {
        return $rules ?? Mount::getRulesForUpdate($this->route()->parameter('mount'));
    }

    public function permission(): string
    {
        return AdminRole::MOUNTS_UPDATE;
    }
}
