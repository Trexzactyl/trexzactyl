<?php

namespace Trexz\Http\Controllers\Admin\Trexz;

use Illuminate\View\View;
use Illuminate\Http\RedirectResponse;
use Prologue\Alerts\AlertsMessageBag;
use Trexz\Http\Controllers\Controller;
use Trexz\Exceptions\Model\DataValidationException;
use Trexz\Exceptions\Repository\RecordNotFoundException;
use Trexz\Http\Requests\Admin\Trexz\AlertFormRequest;
use Trexz\Contracts\Repository\SettingsRepositoryInterface;

class AlertsController extends Controller
{
    /**
     * AppearanceController constructor.
     */
    public function __construct(
        private AlertsMessageBag $alert,
        private SettingsRepositoryInterface $settings
    ) {
    }

    /**
     * Render the Trexz settings interface.
     */
    public function index(): View
    {
        return view('admin.trexz.alerts', [
            'type' => $this->settings->get('trexz::alert:type', 'success'),
            'message' => $this->settings->get('trexz::alert:message'),
        ]);
    }

    /**
     * Update or create an alert.
     *
     * @throws DataValidationException|RecordNotFoundException
     */
    public function update(AlertFormRequest $request): RedirectResponse
    {
        foreach ($request->normalize() as $key => $value) {
            $this->settings->set('trexz::' . $key, $value);
        }

        $this->alert->success('Trexz Alert has been updated.')->flash();

        return redirect()->route('admin.trexz.alerts');
    }

    /**
     * Delete the current alert.
     */
    public function remove(): RedirectResponse
    {
        $this->settings->forget('trexz::alert:type');
        $this->settings->forget('trexz::alert:message');

        $this->alert->success('Trexz Alert has been removed.')->flash();

        return redirect()->route('admin.trexz.alerts');
    }
}
