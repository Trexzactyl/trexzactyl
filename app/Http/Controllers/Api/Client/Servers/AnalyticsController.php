<?php

namespace Trexz\Http\Controllers\Api\Client\Servers;

use Trexz\Models\Server;
use Trexz\Models\AnalyticsData;
use Trexz\Models\AnalyticsMessage;
use Trexz\Http\Requests\Api\Client\ClientApiRequest;
use Trexz\Http\Controllers\Api\Client\ClientApiController;
use Trexz\Transformers\Api\Client\Analytics\MessageTransformer;
use Trexz\Transformers\Api\Client\Analytics\AnalyticsTransformer;

class AnalyticsController extends ClientApiController
{
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Returns all of the analytics assigned to a given server.
     */
    public function index(ClientApiRequest $request, Server $server): array
    {
        $data = AnalyticsData::where('server_id', $server->id)->orderBy('created_at', 'desc')->get();

        return $this->fractal->collection($data)
            ->transformWith($this->getTransformer(AnalyticsTransformer::class))
            ->toArray();
    }

    /**
     * Returns all of the analytics messages assigned to a given server.
     */
    public function messages(ClientApiRequest $request, Server $server): array
    {
        $data = AnalyticsMessage::where('server_id', $server->id)->orderBy('created_at', 'desc')->get();

        return $this->fractal->collection($data)
            ->transformWith($this->getTransformer(MessageTransformer::class))
            ->toArray();
    }
}
