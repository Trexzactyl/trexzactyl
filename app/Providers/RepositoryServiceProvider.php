<?php

namespace Trexz\Providers;

use Illuminate\Support\ServiceProvider;
use Trexz\Repositories\Eloquent\EggRepository;
use Trexz\Repositories\Eloquent\NestRepository;
use Trexz\Repositories\Eloquent\NodeRepository;
use Trexz\Repositories\Eloquent\TaskRepository;
use Trexz\Repositories\Eloquent\UserRepository;
use Trexz\Repositories\Eloquent\ThemeRepository;
use Trexz\Repositories\Eloquent\ApiKeyRepository;
use Trexz\Repositories\Eloquent\ServerRepository;
use Trexz\Repositories\Eloquent\SessionRepository;
use Trexz\Repositories\Eloquent\SubuserRepository;
use Trexz\Repositories\Eloquent\DatabaseRepository;
use Trexz\Repositories\Eloquent\LocationRepository;
use Trexz\Repositories\Eloquent\ScheduleRepository;
use Trexz\Repositories\Eloquent\SettingsRepository;
use Trexz\Repositories\Eloquent\AllocationRepository;
use Trexz\Contracts\Repository\EggRepositoryInterface;
use Trexz\Repositories\Eloquent\EggVariableRepository;
use Trexz\Contracts\Repository\NestRepositoryInterface;
use Trexz\Contracts\Repository\NodeRepositoryInterface;
use Trexz\Contracts\Repository\TaskRepositoryInterface;
use Trexz\Contracts\Repository\UserRepositoryInterface;
use Trexz\Repositories\Eloquent\DatabaseHostRepository;
use Trexz\Contracts\Repository\ThemeRepositoryInterface;
use Trexz\Contracts\Repository\ApiKeyRepositoryInterface;
use Trexz\Contracts\Repository\ServerRepositoryInterface;
use Trexz\Repositories\Eloquent\ServerVariableRepository;
use Trexz\Contracts\Repository\SessionRepositoryInterface;
use Trexz\Contracts\Repository\SubuserRepositoryInterface;
use Trexz\Contracts\Repository\DatabaseRepositoryInterface;
use Trexz\Contracts\Repository\LocationRepositoryInterface;
use Trexz\Contracts\Repository\ScheduleRepositoryInterface;
use Trexz\Contracts\Repository\SettingsRepositoryInterface;
use Trexz\Contracts\Repository\AllocationRepositoryInterface;
use Trexz\Contracts\Repository\EggVariableRepositoryInterface;
use Trexz\Contracts\Repository\DatabaseHostRepositoryInterface;
use Trexz\Contracts\Repository\ServerVariableRepositoryInterface;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register all the repository bindings.
     */
    public function register(): void
    {
        // Eloquent Repositories
        $this->app->bind(AllocationRepositoryInterface::class, AllocationRepository::class);
        $this->app->bind(ApiKeyRepositoryInterface::class, ApiKeyRepository::class);
        $this->app->bind(DatabaseRepositoryInterface::class, DatabaseRepository::class);
        $this->app->bind(DatabaseHostRepositoryInterface::class, DatabaseHostRepository::class);
        $this->app->bind(EggRepositoryInterface::class, EggRepository::class);
        $this->app->bind(EggVariableRepositoryInterface::class, EggVariableRepository::class);
        $this->app->bind(LocationRepositoryInterface::class, LocationRepository::class);
        $this->app->bind(NestRepositoryInterface::class, NestRepository::class);
        $this->app->bind(NodeRepositoryInterface::class, NodeRepository::class);
        $this->app->bind(ScheduleRepositoryInterface::class, ScheduleRepository::class);
        $this->app->bind(ServerRepositoryInterface::class, ServerRepository::class);
        $this->app->bind(ServerVariableRepositoryInterface::class, ServerVariableRepository::class);
        $this->app->bind(SessionRepositoryInterface::class, SessionRepository::class);
        $this->app->bind(SettingsRepositoryInterface::class, SettingsRepository::class);
        $this->app->bind(ThemeRepositoryInterface::class, ThemeRepository::class);
        $this->app->bind(SubuserRepositoryInterface::class, SubuserRepository::class);
        $this->app->bind(TaskRepositoryInterface::class, TaskRepository::class);
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
    }
}
