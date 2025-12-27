<?php

namespace Trexz\Http\Controllers\Api\Application\Nodes;

use Trexz\Models\Node;
use Trexz\Facades\Activity;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use Spatie\QueryBuilder\QueryBuilder;
use Trexz\Exceptions\Service\Node\ConfigurationNotPersistedException;
use Trexz\Services\Nodes\NodeUpdateService;
use Trexz\Services\Nodes\NodeCreationService;
use Trexz\Services\Nodes\NodeDeletionService;
use Trexz\Transformers\Api\Application\NodeTransformer;
use Trexz\Exceptions\Http\QueryValueOutOfRangeHttpException;
use Trexz\Http\Requests\Api\Application\Nodes\GetNodeRequest;
use Trexz\Http\Requests\Api\Application\Nodes\GetNodesRequest;
use Trexz\Http\Requests\Api\Application\Nodes\StoreNodeRequest;
use Trexz\Http\Requests\Api\Application\Nodes\DeleteNodeRequest;
use Trexz\Http\Requests\Api\Application\Nodes\UpdateNodeRequest;
use Trexz\Http\Controllers\Api\Application\ApplicationApiController;

class NodeController extends ApplicationApiController
{
    /**
     * NodeController constructor.
     */
    public function __construct(
        private NodeCreationService $creationService,
        private NodeDeletionService $deletionService,
        private NodeUpdateService $updateService
    ) {
        parent::__construct();
    }

    /**
     * Return all the nodes currently available on the Panel.
     */
    public function index(GetNodesRequest $request): array
    {
        $perPage = (int) $request->query('per_page', '20');
        if ($perPage < 1 || $perPage > 100) {
            throw new QueryValueOutOfRangeHttpException('per_page', 1, 100);
        }

        $nodes = QueryBuilder::for(Node::query())
            ->allowedFilters(['id', 'uuid', 'name', 'fqdn', 'daemon_token_id'])
            ->allowedSorts(['id', 'uuid', 'name', 'fqdn', 'memory', 'disk'])
            ->paginate($perPage);

        return $this->fractal->collection($nodes)
            ->transformWith(NodeTransformer::class)
            ->toArray();
    }

    /**
     * Return data for a single instance of a node.
     */
    public function view(GetNodeRequest $request, Node $node): array
    {
        return $this->fractal->item($node)
            ->addMeta(['utilization' => $node->getPercentUtilization()])
            ->transformWith(NodeTransformer::class)
            ->toArray();
    }

    /**
     * Create a new node on the Panel. Returns the created node and an HTTP/201
     * status response on success.
     *
     * @throws \Trexz\Exceptions\Model\DataValidationException
     */
    public function store(StoreNodeRequest $request): JsonResponse
    {
        $node = $this->creationService->handle($request->validated());

        Activity::event('admin:nodes:create')
            ->property('node', $node)
            ->description('A node was created')
            ->log();

        return $this->fractal->item($node)
            ->transformWith(NodeTransformer::class)
            ->respond(201);
    }

    /**
     * Update an existing node on the Panel.
     *
     * @throws \Throwable
     */
    public function update(UpdateNodeRequest $request, Node $node): array
    {
        $node = $this->updateService->handle(
            $node,
            $request->validated(),
        );

        Activity::event('admin:nodes:update')
            ->property('node', $node)
            ->property('new_data', $request->all())
            ->description('A node was updated')
            ->log();

        return $this->fractal->item($node)
            ->transformWith(NodeTransformer::class)
            ->toArray();
    }

    /**
     * Deletes a given node from the Panel as long as there are no servers
     * currently attached to it.
     *
     * @throws \Trexz\Exceptions\Service\HasActiveServersException
     */
    /**
     * Reset the daemon token for a node.
     *
     * @throws \Throwable
     */
    public function resetToken(GetNodeRequest $request, Node $node): array
    {
        $daemonOffline = false;
        
        try {
            $node = $this->updateService->handle($node, [], true);
        } catch (ConfigurationNotPersistedException $exception) {
            // Token was reset successfully in database, but Wings couldn't be updated
            // Reload the node from database to get the updated token
            $node = Node::find($node->id);
            $daemonOffline = true;
        }

        Activity::event('admin:nodes:token-reset')
            ->property('node', $node)
            ->description('Node daemon token was reset')
            ->log();

        return $this->fractal->item($node)
            ->transformWith(NodeTransformer::class)
            ->addMeta([
                'daemon_offline' => $daemonOffline,
                'warning' => $daemonOffline ? trans('exceptions.node.daemon_off_config_updated') : null,
            ])
            ->toArray();
    }

    public function delete(DeleteNodeRequest $request, Node $node): Response
    {
        $this->deletionService->handle($node);

        Activity::event('admin:nodes:delete')
            ->property('node', $node)
            ->description('A node was deleted')
            ->log();

        return $this->returnNoContent();
    }
}
