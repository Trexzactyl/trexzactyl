<?php

namespace Trexz\Services\Users;

use Trexz\Models\User;
use Illuminate\Contracts\Hashing\Hasher;
use Trexz\Traits\Services\HasUserLevels;

class UserUpdateService
{
    use HasUserLevels;

    /**
     * UserUpdateService constructor.
     */
    public function __construct(private Hasher $hasher)
    {
    }

    /**
     * Update the user model instance and return the updated model.
     *
     * @throws \Throwable
     */
    public function handle(User $user, array $data): User
    {
        if (!empty(array_get($data, 'password'))) {
            $data['password'] = $this->hasher->make($data['password']);
        } else {
            unset($data['password']);
        }

        $user->forceFill($data)->skipValidation()->save();

        return $user->refresh();
    }
}
