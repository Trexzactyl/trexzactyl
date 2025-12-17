<?php

namespace Trexz\Transformers\Api\Client;

use Trexz\Models\Egg;
use Trexz\Transformers\Api\Transformer;

class EggTransformer extends Transformer
{
    /**
     * Return the resource name for the JSONAPI output.
     */
    public function getResourceName(): string
    {
        return Egg::RESOURCE_NAME;
    }

    public function transform(Egg $model): array
    {
        return [
            'uuid' => $model->uuid,
            'name' => $model->name,
        ];
    }
}
