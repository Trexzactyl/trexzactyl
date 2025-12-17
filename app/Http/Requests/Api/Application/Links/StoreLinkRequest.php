<?php

namespace Trexz\Http\Requests\Api\Application\Links;

use Trexz\Models\AdminRole;
use Trexz\Models\CustomLink;
use Trexz\Http\Requests\Api\Application\ApplicationApiRequest;

class StoreLinkRequest extends ApplicationApiRequest
{
    public function rules(): array
    {
        return CustomLink::rules();
    }

    public function permission(): string
    {
        return AdminRole::LINKS_CREATE;
    }
}
