<?php

namespace Trexz\Http\Controllers\Admin\Trexz;

use Illuminate\View\View;
use Illuminate\Http\RedirectResponse;
use Prologue\Alerts\AlertsMessageBag;
use Trexz\Http\Controllers\Controller;
use Illuminate\Contracts\Config\Repository;
use Trexz\Exceptions\Model\DataValidationException;
use Trexz\Exceptions\Repository\RecordNotFoundException;
use Trexz\Http\Requests\Admin\Trexz\AppearanceFormRequest;
use Trexz\Contracts\Repository\SettingsRepositoryInterface;

class AppearanceController extends Controller
{
    /**
     * AppearanceController constructor.
     */
    public function __construct(
        private Repository $config,
        private AlertsMessageBag $alert,
        private SettingsRepositoryInterface $settings
    ) {
    }

    /**
     * Render the Trexz settings interface.
     */
    public function index(): View
    {
        return view('admin.trexz.appearance', [
            'name' => config('app.name'),
            'logo' => config('app.logo'),

            'admin' => config('theme.admin'),
            'user' => ['background' => config('theme.user.background')],
        ]);
    }

    /**
     * Handle settings update.
     *
     * @throws DataValidationException|RecordNotFoundException
     */
    public function update(AppearanceFormRequest $request): RedirectResponse
    {
        foreach ($request->normalize() as $key => $value) {
            $this->settings->set('settings::' . $key, $value);
        }

        $this->alert->success('Trexz Appearance has been updated.')->flash();

        return redirect()->route('admin.trexz.appearance');
    }
}
