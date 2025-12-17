<?php

namespace Trexz\Http\Controllers\Api\Application;

use Trexz\Models\Node;
use Trexz\Models\Server;
use Trexz\Models\Ticket;
use Illuminate\Http\JsonResponse;
use Trexz\Services\Helpers\SoftwareVersionService;
use Trexz\Http\Requests\Api\Application\OverviewRequest;

class OverviewController extends ApplicationApiController
{
    /**
     * OverviewController constructor.
     */
    public function __construct(
        private SoftwareVersionService $softwareVersionService,
        protected \Trexz\Services\Permission\AdminPermissionService $permissionService
    ) {
        parent::__construct();
    }

    /**
     * Returns the permissions associated with the admin user.
     */
    public function permissions(\Illuminate\Http\Request $request): JsonResponse
    {
        return new JsonResponse([
            'object' => 'admin_permissions',
            'attributes' => [
                'permissions' => $this->permissionService->handle($request->user()),
            ],
        ]);
    }

    /**
     * Returns version information.
     */
    public function version(OverviewRequest $request): JsonResponse
    {
        return new JsonResponse($this->softwareVersionService->getVersionData());
    }

    /**
     * Returns metrics relating to server count, user count & more.
     */
    public function metrics(OverviewRequest $request): JsonResponse
    {
        $nodes = Node::query()->count();
        $servers = Server::query()->count();
        $tickets = Ticket::query()->where('status', 'pending')->count();

        $data = [
            'nodes' => $nodes,
            'servers' => $servers,
            'tickets' => $tickets,
        ];

        return new JsonResponse($data);
    }
}
