<?php

namespace Trexz\Http\Requests\Api\Application\Servers;

use Trexz\Models\AdminRole;
use Trexz\Http\Requests\Api\Application\ApplicationApiRequest;

class DeleteServerRequest extends ApplicationApiRequest
{
    public function permission(): string
    {
        return AdminRole::SERVERS_DELETE;
    }

    public function rules(): array
    {
        return [
            'force' => 'nullable|bool',
        ];
    }
}
