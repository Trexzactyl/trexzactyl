<?php

namespace Trexz\Http\Controllers\Api\Client\Servers;

use Trexz\Models\Server;
use Trexz\Transformers\Api\Client\ServerTransformer;
use Trexz\Services\Servers\GetUserPermissionsService;
use Trexz\Http\Controllers\Api\Client\ClientApiController;
use Trexz\Http\Requests\Api\Client\Servers\GetServerRequest;

class ServerController extends ClientApiController
{
    /**
     * ServerController constructor.
     */
    public function __construct(private GetUserPermissionsService $permissionsService)
    {
        parent::__construct();
    }

    /**
     * Transform an individual server into a response that can be consumed by a
     * client using the API.
     */
    public function index(GetServerRequest $request, Server $server): array
    {
        return $this->fractal->item($server)
            ->transformWith(ServerTransformer::class)
            ->addMeta([
                'is_server_owner' => $request->user()->id === $server->owner_id,
                'user_permissions' => $this->permissionsService->handle($server, $request->user()),
            ])
            ->toArray();
    }
}
