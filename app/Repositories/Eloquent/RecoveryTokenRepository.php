<?php

namespace Trexz\Repositories\Eloquent;

use Trexz\Models\RecoveryToken;

class RecoveryTokenRepository extends EloquentRepository
{
    public function model(): string
    {
        return RecoveryToken::class;
    }
}
