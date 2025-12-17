<?php

namespace Trexz\Http\Controllers\Api\Application\Setup;

use Trexz\Models\Setting;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use Trexz\Http\Requests\Api\Application\OverviewRequest;
use Trexz\Http\Controllers\Api\Application\ApplicationApiController;

class SetupController extends ApplicationApiController
{
    /**
     * SetupController constructor.
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Get all known data from existing database rows.
     *
     * @throws \Throwable
     */
    public function data(OverviewRequest $request): JsonResponse
    {
        return response()->json([
            'nodes' => \Trexz\Models\Node::query()->count(),
            'servers' => \Trexz\Models\Server::query()->count(),
            'users' => \Trexz\Models\User::query()->count(),
            'eggs' => \Trexz\Models\Egg::query()->count(),
        ]);
    }

    /**
     * Mark the panel as 'setup' and ready for use.
     *
     * @throws \Throwable
     */
    public function finish(OverviewRequest $request): Response
    {
        Setting::set('settings::app:setup', true);

        return $this->returnNoContent();
    }
}
