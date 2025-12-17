<?php

namespace Trexz\Http\Requests\Api\Application\Links;

use Trexz\Models\AdminRole;
use Trexz\Http\Requests\Api\Application\ApplicationApiRequest;

class DeleteLinkRequest extends ApplicationApiRequest
{
    public function permission(): string
    {
        return AdminRole::LINKS_DELETE;
    }
}
