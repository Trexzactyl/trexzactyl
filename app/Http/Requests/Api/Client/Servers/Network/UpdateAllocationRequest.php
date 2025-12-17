<?php

namespace Trexz\Http\Requests\Api\Client\Servers\Network;

use Trexz\Models\Allocation;
use Trexz\Models\Permission;
use Trexz\Http\Requests\Api\Client\ClientApiRequest;

class UpdateAllocationRequest extends ClientApiRequest
{
    public function permission(): string
    {
        return Permission::ACTION_ALLOCATION_UPDATE;
    }

    public function rules(): array
    {
        $rules = Allocation::getRules();

        return [
            'notes' => array_merge($rules['notes'], ['present']),
        ];
    }
}
