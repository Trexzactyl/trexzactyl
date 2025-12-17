<?php

namespace Trexz\Http\Controllers\Api\Client;

use Trexz\Models\CustomLink;
use Trexz\Transformers\Api\Client\LinkTransformer;
use Trexz\Http\Requests\Api\Client\ClientApiRequest;

class LinkController extends ClientApiController
{
    /**
     * Returns a list of all visible links.
     */
    public function index(ClientApiRequest $request): array
    {
        $links = CustomLink::where('visible', true)->get();

        return $this->fractal->collection($links)
            ->transformWith(LinkTransformer::class)
            ->toArray();
    }
}
