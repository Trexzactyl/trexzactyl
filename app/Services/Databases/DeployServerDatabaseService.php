<?php

namespace Trexz\Services\Databases;

use Trexz\Models\Server;
use Trexz\Models\Database;
use Webmozart\Assert\Assert;
use Trexz\Models\DatabaseHost;
use Trexz\Exceptions\Service\Database\NoSuitableDatabaseHostException;

class DeployServerDatabaseService
{
    /**
     * DeployServerDatabaseService constructor.
     */
    public function __construct(private DatabaseManagementService $managementService)
    {
    }

    /**
     * @throws \Throwable
     * @throws \Trexz\Exceptions\Service\Database\TooManyDatabasesException
     * @throws \Trexz\Exceptions\Service\Database\DatabaseClientFeatureNotEnabledException
     */
    public function handle(Server $server, array $data): Database
    {
        Assert::notEmpty($data['database'] ?? null);
        Assert::notEmpty($data['remote'] ?? null);

        $databaseHostId = $server->node->database_host_id;
        if (is_null($databaseHostId)) {
            if (!config('trexz.client_features.databases.allow_random')) {
                throw new NoSuitableDatabaseHostException();
            }

            $hosts = DatabaseHost::query()->get()->toBase();
            if ($hosts->isEmpty()) {
                throw new NoSuitableDatabaseHostException();
            }

            /** @var \Trexz\Models\DatabaseHost $databaseHost */
            $databaseHost = $hosts->random();
            $databaseHostId = $databaseHost->id;
        }

        return $this->managementService->create($server, [
            'database_host_id' => $databaseHostId,
            'database' => DatabaseManagementService::generateUniqueDatabaseName($data['database'], $server->id),
            'remote' => $data['remote'],
        ]);
    }
}
