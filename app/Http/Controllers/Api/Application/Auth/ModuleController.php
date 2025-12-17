<?php

namespace Trexz\Http\Controllers\Api\Application\Auth;

use Trexz\Models\Setting;
use Trexz\Facades\Activity;
use Illuminate\Http\Response;
use Trexz\Http\Controllers\Api\Application\ApplicationApiController;
use Trexz\Http\Requests\Api\Application\Auth\EnableAuthModuleRequest;
use Trexz\Http\Requests\Api\Application\Auth\UpdateAuthModuleRequest;
use Trexz\Http\Requests\Api\Application\Auth\DisableAuthModuleRequest;

class ModuleController extends ApplicationApiController
{
    /**
     * ModuleController constructor.
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Enable a new module on the panel.
     *
     * @throws \Throwable
     */
    public function enable(EnableAuthModuleRequest $request): Response
    {
        Setting::set('settings::modules:auth:' . $request->all()[0] . ':enabled', true);

        Activity::event('admin:auth:module:enable')
            ->property('module', $request->all()[0])
            ->description('An authentication module was enabled')
            ->log();

        return $this->returnNoContent();
    }

    /**
     * Disable a module on the panel.
     *
     * @throws \Throwable
     */
    public function disable(DisableAuthModuleRequest $request): Response
    {
        Setting::set('settings::modules:auth:' . $request->all()[0] . ':enabled', false);

        Activity::event('admin:auth:module:disable')
            ->property('module', $request->all()[0])
            ->description('An authentication module was disabled')
            ->log();

        return $this->returnNoContent();
    }

    /**
     * Update the module settings in the Panel.
     * Currently, it is only possible to update one value at once.
     *
     * @throws \Throwable
     */
    public function update(UpdateAuthModuleRequest $request): Response
    {
        Setting::set(
            'settings::modules:auth:' . $request->input('module') . ':' . $request->input('key'),
            $request->input('value')
        );

        return $this->returnNoContent();
    }
}
