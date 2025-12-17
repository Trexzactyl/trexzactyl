<?php

namespace Trexz\Http\Requests\Api\Application\Intelligence;

use Trexz\Models\AdminRole;
use Trexz\Http\Requests\Api\Application\ApplicationApiRequest;

class QueryRequest extends ApplicationApiRequest
{
    public function rules(): array
    {
        return [
            'query' => 'required|string|min:3',
        ];
    }

    public function permission(): string
    {
        return AdminRole::AI_READ;
    }
}
