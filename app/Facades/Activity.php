<?php

namespace Trexz\Facades;

use Illuminate\Support\Facades\Facade;
use Trexz\Services\Activity\ActivityLogService;

class Activity extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return ActivityLogService::class;
    }
}
