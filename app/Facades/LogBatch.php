<?php

namespace Trexz\Facades;

use Illuminate\Support\Facades\Facade;
use Trexz\Services\Activity\ActivityLogBatchService;

class LogBatch extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return ActivityLogBatchService::class;
    }
}
