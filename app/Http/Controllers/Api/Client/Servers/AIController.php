<?php

namespace Trexz\Http\Controllers\Api\Client\Servers;

use GeminiAPI\Client;
use Trexz\Models\Server;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use GeminiAPI\Resources\Parts\TextPart;
use Trexz\Http\Controllers\Api\Client\ClientApiController;

class AIController extends ClientApiController
{
    /**
     * AIController constructor.
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Send an AI generated response to debug a server error.
     */
    public function index(Request $request, Server $server): JsonResponse
    {
        if (!config('modules.ai.enabled')) {
            throw new \Exception('The Trexz AI module is not enabled.');
        }

        $client = new Client(config('modules.ai.key'));

        $response = $client->geminiPro()->generateContent(
            new TextPart($request->input('query')),
        );

        return response()->json($response->text());
    }
}
