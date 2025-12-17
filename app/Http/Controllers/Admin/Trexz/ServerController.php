<?php

namespace Trexz\Http\Controllers\Admin\Trexz;

use Illuminate\View\View;
use Illuminate\Http\RedirectResponse;
use Prologue\Alerts\AlertsMessageBag;
use Trexz\Http\Controllers\Controller;
use Trexz\Http\Requests\Admin\Trexz\ServerFormRequest;
use Trexz\Contracts\Repository\SettingsRepositoryInterface;

class ServerController extends Controller
{
    /**
     * StoreController constructor.
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
        $prefix = 'trexz::renewal:';

        return view('admin.trexz.server', [
            'enabled' => $this->settings->get($prefix . 'enabled', false),
            'default' => $this->settings->get($prefix . 'default', 7),
            'cost' => $this->settings->get($prefix . 'cost', 20),
            'editing' => $this->settings->get($prefix . 'editing', false),
            'deletion' => $this->settings->get($prefix . 'deletion', true),
        ]);
    }

    /**
     * Handle settings update.
     *
     * @throws \Trexz\Exceptions\Model\DataValidationException
     * @throws \Trexz\Exceptions\Repository\RecordNotFoundException
     */
    public function update(ServerFormRequest $request): RedirectResponse
    {
        foreach ($request->normalize() as $key => $value) {
            $this->settings->set('trexz::renewal:' . $key, $value);
        }

        $this->alert->success('Trexz Server settings has been updated.')->flash();

        return redirect()->route('admin.trexz.server');
    }
}
