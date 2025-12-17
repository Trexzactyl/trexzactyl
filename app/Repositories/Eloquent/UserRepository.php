<?php

namespace Trexz\Repositories\Eloquent;

use Trexz\Models\User;
use Trexz\Contracts\Repository\UserRepositoryInterface;

class UserRepository extends EloquentRepository implements UserRepositoryInterface
{
    /**
     * Return the model backing this repository.
     */
    public function model(): string
    {
        return User::class;
    }
}
