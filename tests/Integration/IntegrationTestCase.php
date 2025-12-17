<?php

namespace Trexz\Tests\Integration;

use Trexz\Tests\TestCase;
use Trexz\Events\ActivityLogged;
use Illuminate\Support\Facades\Event;
use Trexz\Tests\Assertions\AssertsActivityLogged;
use Trexz\Tests\Traits\Integration\CreatesTestModels;

abstract class IntegrationTestCase extends TestCase
{
    use CreatesTestModels;
    use AssertsActivityLogged;

    protected $defaultHeaders = [
        'Accept' => 'application/json',
    ];

    public function setUp(): void
    {
        parent::setUp();

        Event::fake(ActivityLogged::class);
    }
}
