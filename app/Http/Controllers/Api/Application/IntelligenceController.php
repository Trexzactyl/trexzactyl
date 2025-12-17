<?php

namespace Trexz\Http\Controllers\Api\Application;

use GeminiAPI\Client;
use Trexz\Models\Setting;
use Trexz\Facades\Activity;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use GeminiAPI\Resources\Parts\TextPart;
use Trexz\Http\Requests\Api\Application\Intelligence;

class IntelligenceController extends ApplicationApiController
{
    /**
     * IntelligenceController constructor.
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Update the AI settings for the Panel.
     *
     * @throws \Throwable
     */
    public function update(Intelligence\UpdateIntelligenceSettingsRequest $request): Response
    {
        foreach ($request->normalize() as $key => $value) {
            if ($key == 'key' && is_bool($value)) {
                continue;
            }

            Setting::set('settings::modules:ai:' . $key, $value);
        }

        Activity::event('admin:ai:update')
            ->property('settings', $request->all())
            ->description('Trexz AI settings were updated')
            ->log();

        return $this->returnNoContent();
    }

    /**
     * Send a query to Trexz AI through Gemini.
     *
     * @throws \Throwable
     */
    public function query(Intelligence\QueryRequest $request): JsonResponse
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
