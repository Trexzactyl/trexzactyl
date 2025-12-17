<?php

namespace Trexz\Http\Controllers\Admin\Nests;

use Trexz\Models\Egg;
use Illuminate\View\View;
use Trexz\Models\EggVariable;
use Illuminate\Http\RedirectResponse;
use Prologue\Alerts\AlertsMessageBag;
use Trexz\Http\Controllers\Controller;
use Illuminate\View\Factory as ViewFactory;
use Trexz\Contracts\Repository\EggRepositoryInterface;
use Trexz\Services\Eggs\Variables\VariableUpdateService;
use Trexz\Http\Requests\Admin\Egg\EggVariableFormRequest;
use Trexz\Services\Eggs\Variables\VariableCreationService;
use Trexz\Contracts\Repository\EggVariableRepositoryInterface;

class EggVariableController extends Controller
{
    /**
     * EggVariableController constructor.
     */
    public function __construct(
        protected AlertsMessageBag $alert,
        protected VariableCreationService $creationService,
        protected VariableUpdateService $updateService,
        protected EggRepositoryInterface $repository,
        protected EggVariableRepositoryInterface $variableRepository,
        protected ViewFactory $view
    ) {
    }

    /**
     * Handle request to view the variables attached to an Egg.
     *
     * @throws \Trexz\Exceptions\Repository\RecordNotFoundException
     */
    public function view(int $egg): View
    {
        $egg = $this->repository->getWithVariables($egg);

        return $this->view->make('admin.eggs.variables', ['egg' => $egg]);
    }

    /**
     * Handle a request to create a new Egg variable.
     *
     * @throws \Trexz\Exceptions\Model\DataValidationException
     * @throws \Trexz\Exceptions\Service\Egg\Variable\BadValidationRuleException
     * @throws \Trexz\Exceptions\Service\Egg\Variable\ReservedVariableNameException
     */
    public function store(EggVariableFormRequest $request, Egg $egg): RedirectResponse
    {
        $this->creationService->handle($egg->id, $request->normalize());
        $this->alert->success(trans('admin/nests.variables.notices.variable_created'))->flash();

        return redirect()->route('admin.nests.egg.variables', $egg->id);
    }

    /**
     * Handle a request to update an existing Egg variable.
     *
     * @throws \Trexz\Exceptions\DisplayException
     * @throws \Trexz\Exceptions\Model\DataValidationException
     * @throws \Trexz\Exceptions\Repository\RecordNotFoundException
     * @throws \Trexz\Exceptions\Service\Egg\Variable\ReservedVariableNameException
     */
    public function update(EggVariableFormRequest $request, Egg $egg, EggVariable $variable): RedirectResponse
    {
        $this->updateService->handle($variable, $request->normalize());
        $this->alert->success(trans('admin/nests.variables.notices.variable_updated', [
            'variable' => $variable->name,
        ]))->flash();

        return redirect()->route('admin.nests.egg.variables', $egg->id);
    }

    /**
     * Handle a request to delete an existing Egg variable from the Panel.
     */
    public function destroy(int $egg, EggVariable $variable): RedirectResponse
    {
        $this->variableRepository->delete($variable->id);
        $this->alert->success(trans('admin/nests.variables.notices.variable_deleted', [
            'variable' => $variable->name,
        ]))->flash();

        return redirect()->route('admin.nests.egg.variables', $egg);
    }
}
