<?php

namespace Trexz\Http\Controllers\Api\Application\Nodes;

use Trexz\Services\Deployment\FindViableNodesService;
use Trexz\Transformers\Api\Application\NodeTransformer;
use Trexz\Http\Controllers\Api\Application\ApplicationApiController;
use Trexz\Http\Requests\Api\Application\Nodes\GetDeployableNodesRequest;

class NodeDeploymentController extends ApplicationApiController
{
    /**
     * NodeDeploymentController constructor.
     */
    public function __construct(private FindViableNodesService $viableNodesService)
    {
        parent::__construct();
    }

    /**
     * Finds any nodes that are available using the given deployment criteria. This works
     * similarly to the server creation process, but allows you to pass the deployment object
     * to this endpoint and get back a list of all Nodes satisfying the requirements.
     *
     * @throws \Trexz\Exceptions\Service\Deployment\NoViableNodeException
     */
    public function __invoke(GetDeployableNodesRequest $request): array
    {
        $data = $request->validated();
        $nodes = $this->viableNodesService
            ->setMemory($data['memory'])
            ->setDisk($data['disk'])
            ->handle($request->query('per_page'), $request->query('page'));

        return $this->fractal->collection($nodes)
            ->transformWith(NodeTransformer::class)
            ->toArray();
    }
}
