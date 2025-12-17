<?php

namespace Trexz\Http\Controllers\Api\Client\Servers;

use Trexz\Models\Server;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use Trexz\Exceptions\DisplayException;
use Trexz\Services\Servers\ServerEditService;
use Trexz\Http\Controllers\Api\Client\ClientApiController;
use Trexz\Http\Requests\Api\Client\Servers\EditServerRequest;

class EditController extends ClientApiController
{
    /**
     * PowerController constructor.
     */
    public function __construct(private ServerEditService $editService)
    {
        parent::__construct();
    }

    /**
     * Edit a server's resource limits.
     *
     * @throws DisplayException
     */
    public function index(EditServerRequest $request, Server $server): JsonResponse
    {
        if ($this->settings->get('trexz::renewal:editing') != 'true') {
            throw new DisplayException('Server editing is currently disabled.');
        }

        if ($request->user()->id != $server->owner_id) {
            throw new DisplayException('You do not own this server, so you cannot edit the resources.');
        }

        $this->editService->handle($request, $server);

        return new JsonResponse([], Response::HTTP_NO_CONTENT);
    }
}
