<?php

namespace Trexz\Http\Controllers\Api\Application\Nests;

use Trexz\Models\Nest;
use Trexz\Facades\Activity;
use Illuminate\Http\Response;
use Spatie\QueryBuilder\QueryBuilder;
use Trexz\Services\Nests\NestUpdateService;
use Trexz\Services\Nests\NestCreationService;
use Trexz\Services\Nests\NestDeletionService;
use Trexz\Services\Eggs\Sharing\EggImporterService;
use Trexz\Transformers\Api\Application\EggTransformer;
use Trexz\Transformers\Api\Application\NestTransformer;
use Trexz\Exceptions\Http\QueryValueOutOfRangeHttpException;
use Trexz\Http\Requests\Api\Application\Nests\GetNestRequest;
use Trexz\Http\Requests\Api\Application\Eggs\ImportEggRequest;
use Trexz\Http\Requests\Api\Application\Nests\GetNestsRequest;
use Trexz\Http\Requests\Api\Application\Nests\StoreNestRequest;
use Trexz\Http\Requests\Api\Application\Nests\DeleteNestRequest;
use Trexz\Http\Requests\Api\Application\Nests\UpdateNestRequest;
use Trexz\Http\Controllers\Api\Application\ApplicationApiController;

class NestController extends ApplicationApiController
{
    /**
     * NestController constructor.
     */
    public function __construct(
        private NestCreationService $nestCreationService,
        private NestDeletionService $nestDeletionService,
        private NestUpdateService $nestUpdateService,
        private EggImporterService $eggImporterService
    ) {
        parent::__construct();
    }

    /**
     * Return all Nests that exist on the Panel.
     */
    public function index(GetNestsRequest $request): array
    {
        $perPage = (int) $request->query('per_page', '20');
        if ($perPage > 100) {
            throw new QueryValueOutOfRangeHttpException('per_page', 1, 100);
        }

        $nests = QueryBuilder::for(Nest::query())
            ->allowedFilters(['id', 'name', 'author'])
            ->allowedSorts(['id', 'name', 'author']);
        if ($perPage > 0) {
            $nests = $nests->paginate($perPage);
        }

        return $this->fractal->collection($nests)
            ->transformWith(NestTransformer::class)
            ->toArray();
    }

    /**
     * Return information about a single Nest model.
     */
    public function view(GetNestRequest $request, Nest $nest): array
    {
        return $this->fractal->item($nest)
            ->transformWith(NestTransformer::class)
            ->toArray();
    }

    /**
     * Creates a new nest.
     *
     * @throws \Trexz\Exceptions\Model\DataValidationException
     */
    public function store(StoreNestRequest $request): array
    {
        $nest = $this->nestCreationService->handle($request->validated());

        Activity::event('admin:nests:create')
            ->property('nest', $nest)
            ->description('A nest was created')
            ->log();

        return $this->fractal->item($nest)
            ->transformWith(NestTransformer::class)
            ->toArray();
    }

    /**
     * Imports an egg.
     */
    public function import(ImportEggRequest $request, Nest $nest): array
    {
        $egg = $this->eggImporterService->handleContent(
            $nest->id,
            $request->getContent(),
            $request->headers->get('Content-Type'),
        );

        Activity::event('admin:nests:import')
            ->property('egg', $egg)
            ->property('nest', $nest)
            ->description('An egg was imported to a nest')
            ->log();

        return $this->fractal->item($egg)
            ->transformWith(EggTransformer::class)
            ->toArray();
    }

    /**
     * Updates an existing nest.
     *
     * @throws \Trexz\Exceptions\Model\DataValidationException
     * @throws \Trexz\Exceptions\Repository\RecordNotFoundException
     */
    public function update(UpdateNestRequest $request, Nest $nest): array
    {
        $this->nestUpdateService->handle($nest->id, $request->validated());

        Activity::event('admin:nests:update')
            ->property('nest', $nest)
            ->property('new_data', $request->all())
            ->description('A nest was updated')
            ->log();

        return $this->fractal->item($nest)
            ->transformWith(NestTransformer::class)
            ->toArray();
    }

    /**
     * Deletes an existing nest.
     *
     * @throws \Trexz\Exceptions\Service\HasActiveServersException
     */
    public function delete(DeleteNestRequest $request, Nest $nest): Response
    {
        $this->nestDeletionService->handle($nest->id);

        Activity::event('admin:nests:delete')
            ->property('nest', $nest)
            ->description('A nest was deleted')
            ->log();

        return $this->returnNoContent();
    }
}
