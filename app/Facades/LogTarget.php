<?php

namespace Trexz\Facades;

use Illuminate\Support\Facades\Facade;
use Trexz\Services\Activity\ActivityLogTargetableService;

class LogTarget extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return ActivityLogTargetableService::class;
    }
}
