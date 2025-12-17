<?php

namespace Trexz\Http\Requests\Api\Client\Servers\Subusers;

use Trexz\Models\Permission;

class DeleteSubuserRequest extends SubuserRequest
{
    public function permission(): string
    {
        return Permission::ACTION_USER_DELETE;
    }
}
