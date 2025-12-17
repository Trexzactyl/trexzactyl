<?php

namespace Trexz\Http\Requests\Api\Client\Servers\Files;

use Trexz\Models\Permission;
use Trexz\Http\Requests\Api\Client\ClientApiRequest;

class UploadFileRequest extends ClientApiRequest
{
    public function permission(): string
    {
        return Permission::ACTION_FILE_CREATE;
    }
}
