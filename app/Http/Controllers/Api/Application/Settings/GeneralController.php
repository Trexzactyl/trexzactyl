<?php

namespace Trexz\Http\Controllers\Api\Application\Settings;

use Trexz\Models\Setting;
use Illuminate\Http\Response;
use Trexz\Http\Controllers\Api\Application\ApplicationApiController;
use Trexz\Http\Requests\Api\Application\Settings\UpdateApplicationSettingsRequest;

class GeneralController extends ApplicationApiController
{
    /**
     * GeneralController constructor.
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Update the general settings on the Panel.
     *
     * @throws \Throwable
     */
    public function update(UpdateApplicationSettingsRequest $request): Response
    {
        foreach ($request->normalize() as $key => $value) {
            Setting::set('settings::' . $key, $value);
        }

        return $this->returnNoContent();
    }
}
