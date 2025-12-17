<?php

namespace Trexz\Exceptions\Service;

use Illuminate\Http\Response;
use Trexz\Exceptions\DisplayException;

class HasActiveServersException extends DisplayException
{
    public function getStatusCode(): int
    {
        return Response::HTTP_BAD_REQUEST;
    }
}
