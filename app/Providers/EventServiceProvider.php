<?php

namespace Trexz\Providers;

use Trexz\Models\User;
use Trexz\Models\Server;
use Trexz\Models\Subuser;
use Trexz\Models\EggVariable;
use Trexz\Observers\UserObserver;
use Trexz\Observers\ServerObserver;
use Trexz\Observers\SubuserObserver;
use Trexz\Observers\EggVariableObserver;
use Trexz\Listeners\Auth\AuthenticationListener;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    protected $subscribe = [
        AuthenticationListener::class,
    ];

    /**
     * Register any events for your application.
     */
    public function boot(): void
    {
        parent::boot();

        User::observe(UserObserver::class);
        Server::observe(ServerObserver::class);
        Subuser::observe(SubuserObserver::class);
        EggVariable::observe(EggVariableObserver::class);
    }
}
