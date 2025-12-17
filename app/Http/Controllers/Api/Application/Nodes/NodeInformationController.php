<?php

namespace Trexz\Http\Controllers\Api\Application\Nodes;

use Trexz\Models\Node;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Trexz\Repositories\Wings\DaemonConfigurationRepository;
use Trexz\Http\Controllers\Api\Application\ApplicationApiController;

class NodeInformationController extends ApplicationApiController
{
    /**
     * NodeInformationController constructor.
     */
    public function __construct(private DaemonConfigurationRepository $repository)
    {
        parent::__construct();
    }

    /**
     * Returns system information from the node.
     *
     * @throws \Trexz\Exceptions\Http\Connection\DaemonConnectionException
     */
    public function information(Request $request, Node $node): JsonResponse
    {
        $data = $this->repository->setNode($node)->getSystemInformation();

        return new JsonResponse([
            'version' => $data['version'] ?? null,
            'system' => [
                'type' => Str::title($data['os'] ?? 'Unknown'),
                'arch' => $data['architecture'] ?? null,
                'release' => $data['kernel_version'] ?? null,
                'cpus' => $data['cpu_count'] ?? null,
                'supercharged' => $data['supercharged'] ?? false,
            ],
        ]);
    }

    /**
     * Returns system utilization from the node.
     *
     * @throws \Trexz\Exceptions\Http\Connection\DaemonConnectionException
     */
    public function utilization(Request $request, Node $node): JsonResponse
    {
        $data = $this->repository->setNode($node)->getSystemUtilization();

        return new JsonResponse([
            'cpu' => $data['cpu'],
            'memory' => [
                'total' => $data['memory_total'],
                'used' => $data['memory_used'],
            ],
            'swap' => [
                'total' => $data['swap_total'],
                'used' => $data['swap_used'],
            ],
            'disk' => [
                'total' => $data['disk_total'],
                'used' => $data['disk_used'],
            ],
        ]);
    }
}
