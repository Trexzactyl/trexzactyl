<?php

namespace Trexz\Http\Controllers\Api\Client\Servers;

use Trexz\Models\Server;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use Trexz\Services\Servers\ServerRenewalService;
use Trexz\Http\Requests\Api\Client\ClientApiRequest;
use Trexz\Http\Controllers\Api\Client\ClientApiController;

class RenewalController extends ClientApiController
{
    public function __construct(private ServerRenewalService $renewalService)
    {
        parent::__construct();
    }

    /**
     * Renew a server.
     */
    public function index(ClientApiRequest $request, Server $server): JsonResponse
    {
        $this->renewalService->handle($request, $server);

        return new JsonResponse([], Response::HTTP_NO_CONTENT);
    }
}
