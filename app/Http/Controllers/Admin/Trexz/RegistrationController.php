<?php

namespace Trexz\Http\Controllers\Admin\Trexz;

use Illuminate\View\View;
use Illuminate\Http\RedirectResponse;
use Prologue\Alerts\AlertsMessageBag;
use Trexz\Http\Controllers\Controller;
use Trexz\Contracts\Repository\SettingsRepositoryInterface;
use Trexz\Http\Requests\Admin\Trexz\RegistrationFormRequest;

class RegistrationController extends Controller
{
    /**
     * RegistrationController constructor.
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
        return view('admin.trexz.registration', [
            'enabled' => $this->settings->get('trexz::registration:enabled', false),
            'verification' => $this->settings->get('trexz::registration:verification', false),

            'discord_enabled' => $this->settings->get('trexz::discord:enabled', false),
            'discord_id' => $this->settings->get('trexz::discord:id', 0),
            'discord_secret' => $this->settings->get('trexz::discord:secret', 0),

            'cpu' => $this->settings->get('trexz::registration:cpu', 100),
            'memory' => $this->settings->get('trexz::registration:memory', 1024),
            'disk' => $this->settings->get('trexz::registration:disk', 5120),
            'slot' => $this->settings->get('trexz::registration:slot', 1),
            'port' => $this->settings->get('trexz::registration:port', 1),
            'backup' => $this->settings->get('trexz::registration:backup', 1),
            'database' => $this->settings->get('trexz::registration:database', 0),
        ]);
    }

    /**
     * Handle settings update.
     *
     * @throws \Trexz\Exceptions\Model\DataValidationException
     * @throws \Trexz\Exceptions\Repository\RecordNotFoundException
     */
    public function update(RegistrationFormRequest $request): RedirectResponse
    {
        foreach ($request->normalize() as $key => $value) {
            $this->settings->set('trexz::' . $key, $value);
        }

        $this->alert->success('Trexz Registration has been updated.')->flash();

        return redirect()->route('admin.trexz.registration');
    }
}
