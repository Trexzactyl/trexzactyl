<?php

namespace Trexz\Http\Controllers\Api\Client\Billing;

use Trexz\Models\EggVariable;
use Trexz\Transformers\Api\Client\EggVariableTransformer;
use Trexz\Http\Controllers\Api\Client\ClientApiController;

class EggController extends ClientApiController
{
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Returns all the variables of an egg.
     */
    public function index(int $id): array
    {
        $variables = EggVariable::where('egg_id', $id)
            ->where('user_viewable', true)
            ->get();

        return $this->fractal->collection($variables)
            ->transformWith(EggVariableTransformer::class)
            ->toArray();
    }
}
