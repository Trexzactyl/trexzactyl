<?php

namespace Trexz\Events\Auth;

use Trexz\Models\User;
use Trexz\Events\Event;

class DirectLogin extends Event
{
    public function __construct(public User $user, public bool $remember)
    {
    }
}
