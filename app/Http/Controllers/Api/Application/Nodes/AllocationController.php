<?php

namespace Trexz\Http\Controllers\Api\Application\Nodes;

use Trexz\Models\Node;
use Illuminate\Http\Request;
use Trexz\Models\Allocation;
use Illuminate\Http\Response;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\AllowedFilter;
use Illuminate\Database\Eloquent\Builder;
use Trexz\Services\Allocations\AssignmentService;
use Trexz\Services\Allocations\AllocationDeletionService;
use Trexz\Exceptions\Http\QueryValueOutOfRangeHttpException;
use Trexz\Transformers\Api\Application\AllocationTransformer;
use Trexz\Http\Controllers\Api\Application\ApplicationApiController;
use Trexz\Http\Requests\Api\Application\Allocations\GetAllocationsRequest;
use Trexz\Http\Requests\Api\Application\Allocations\StoreAllocationRequest;
use Trexz\Http\Requests\Api\Application\Allocations\DeleteAllocationRequest;

class AllocationController extends ApplicationApiController
{
    /**
     * AllocationController constructor.
     */
    public function __construct(
        private AssignmentService $assignmentService,
        private AllocationDeletionService $deletionService
    ) {
        parent::__construct();
    }

    /**
     * Return all the allocations that exist for a given node.
     */
    public function index(GetAllocationsRequest $request, Node $node): array
    {
        $perPage = (int) $request->query('per_page', '20');
        if ($perPage < 1 || $perPage > 100) {
            throw new QueryValueOutOfRangeHttpException('per_page', 1, 100);
        }

        $allocations = QueryBuilder::for(Allocation::query()->where('node_id', '=', $node->id))
            ->allowedFilters([
                'id', 'ip', 'port', 'alias',
                AllowedFilter::callback('server_id', function (Builder $query, $value) {
                    if ($value === '0') {
                        $query->whereNull('server_id');
                    } else {
                        $query->where('server_id', '=', $value);
                    }
                }),
                AllowedFilter::callback('search', function (Builder $query, $value) {
                    $query->where(function ($q) use ($value) {
                        $q->where('ip', 'like', "%{$value}%")
                        ->orWhere('port', 'like', "%{$value}%")
                        ->orWhere('ip_alias', 'like', "%{$value}%");
                    });
                }),
            ])
            ->allowedSorts(['id', 'ip', 'port', 'server_id'])
            ->paginate($perPage);

        return $this->fractal->collection($allocations)
            ->transformWith(AllocationTransformer::class)
            ->toArray();
    }

    /**
     * Store new allocations for a given node.
     *
     * @throws \Trexz\Exceptions\DisplayException
     * @throws \Trexz\Exceptions\Service\Allocation\CidrOutOfRangeException
     * @throws \Trexz\Exceptions\Service\Allocation\InvalidPortMappingException
     * @throws \Trexz\Exceptions\Service\Allocation\PortOutOfRangeException
     * @throws \Trexz\Exceptions\Service\Allocation\TooManyPortsInRangeException
     */
    public function store(StoreAllocationRequest $request, Node $node): Response
    {
        $request->merge(['allocation_ports' => $request['end_port'] ? range($request['start_port'], $request['end_port']) : [$request['start_port']],
        ]);

        $this->assignmentService->handle($node, $request->all());

        return $this->returnNoContent();
    }

    /**
     * Delete a specific allocation from the Panel.
     *
     * @throws \Trexz\Exceptions\Service\Allocation\ServerUsingAllocationException
     */
    public function delete(DeleteAllocationRequest $request, Node $node, Allocation $allocation): Response
    {
        $this->deletionService->handle($allocation);

        return $this->returnNoContent();
    }

    /**
     * Delete all unused allocations on a node.
     */
    public function deleteAll(Request $request, Node $node): Response
    {
        $allocations = Allocation::where('server_id', null)->get();

        $allocations->map->delete();

        return $this->returnNoContent();
    }
}
