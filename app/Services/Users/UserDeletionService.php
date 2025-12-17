<?php

namespace Trexz\Services\Users;

use Trexz\Models\User;
use Trexz\Exceptions\DisplayException;
use Illuminate\Contracts\Translation\Translator;
use Trexz\Contracts\Repository\UserRepositoryInterface;
use Trexz\Contracts\Repository\ServerRepositoryInterface;

class UserDeletionService
{
    /**
     * UserDeletionService constructor.
     */
    public function __construct(
        protected UserRepositoryInterface $repository,
        protected ServerRepositoryInterface $serverRepository,
        protected Translator $translator
    ) {
    }

    /**
     * Delete a user from the panel only if they have no servers attached to their account.
     *
     * @throws \Trexz\Exceptions\DisplayException
     */
    public function handle(int|User $user): void
    {
        if ($user instanceof User) {
            $user = $user->id;
        }

        $servers = $this->serverRepository->setColumns('id')->findCountWhere([['owner_id', '=', $user]]);
        if ($servers > 0) {
            throw new DisplayException($this->translator->get('admin/user.exceptions.user_has_servers'));
        }

        $this->repository->delete($user);
    }
}
