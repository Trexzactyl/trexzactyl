<?php

namespace Trexz\Tests\Unit\Http\Middleware;

use Trexz\Tests\TestCase;
use Trexz\Tests\Traits\Http\RequestMockHelpers;
use Trexz\Tests\Traits\Http\MocksMiddlewareClosure;
use Trexz\Tests\Assertions\MiddlewareAttributeAssertionsTrait;

abstract class MiddlewareTestCase extends TestCase
{
    use MiddlewareAttributeAssertionsTrait;
    use MocksMiddlewareClosure;
    use RequestMockHelpers;

    /**
     * Setup tests with a mocked request object and normal attributes.
     */
    public function setUp(): void
    {
        parent::setUp();

        $this->buildRequestMock();
    }
}
