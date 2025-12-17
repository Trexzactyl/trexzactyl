<?php

namespace Trexz\Http\Requests\Api\Client\Account;

use Trexz\Models\User;
use Illuminate\Container\Container;
use Illuminate\Contracts\Hashing\Hasher;
use Trexz\Http\Requests\Api\Client\ClientApiRequest;
use Trexz\Exceptions\Http\Base\InvalidPasswordProvidedException;

class UpdateUsernameRequest extends ClientApiRequest
{
    /**
     * @throws \Trexz\Exceptions\Http\Base\InvalidPasswordProvidedException
     */
    public function authorize(): bool
    {
        if (!parent::authorize()) {
            return false;
        }

        $hasher = Container::getInstance()->make(Hasher::class);

        // Verify password matches.
        if (!$hasher->check($this->input('password'), $this->user()->password)) {
            throw new InvalidPasswordProvidedException(trans('validation.internal.invalid_password'));
        }

        return true;
    }

    public function rules(): array
    {
        $rules = User::getRulesForUpdate($this->user());

        return ['username' => $rules['username']];
    }
}
