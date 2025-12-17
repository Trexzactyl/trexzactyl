<?php

namespace Trexz\Http\Controllers\Api\Application\Users;

use Trexz\Models\User;
use Trexz\Transformers\Api\Application\UserTransformer;
use Trexz\Http\Controllers\Api\Application\ApplicationApiController;
use Trexz\Http\Requests\Api\Application\Users\GetExternalUserRequest;

class ExternalUserController extends ApplicationApiController
{
    /**
     * Retrieve a specific user from the database using their external ID.
     */
    public function index(GetExternalUserRequest $request, string $external_id): array
    {
        $user = User::query()->where('external_id', $external_id)->firstOrFail();

        return $this->fractal->item($user)
            ->transformWith(UserTransformer::class)
            ->toArray();
    }
}
