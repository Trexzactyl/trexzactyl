<?php

namespace Trexz\Http\Controllers\Admin\Trexz;

use Illuminate\View\View;
use Illuminate\Http\RedirectResponse;
use Prologue\Alerts\AlertsMessageBag;
use Trexz\Http\Controllers\Controller;
use Trexz\Contracts\Repository\SettingsRepositoryInterface;
use Trexz\Http\Requests\Admin\Trexz\ReferralsFormRequest;

class ReferralsController extends Controller
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
     * Render the Trexz referrals interface.
     */
    public function index(): View
    {
        return view('admin.trexz.referrals', [
            'enabled' => $this->settings->get('trexz::referrals:enabled', false),
            'reward' => $this->settings->get('trexz::referrals:reward', 250),
        ]);
    }

    /**
     * Handle settings update.
     *
     * @throws \Trexz\Exceptions\Model\DataValidationException
     * @throws \Trexz\Exceptions\Repository\RecordNotFoundException
     */
    public function update(ReferralsFormRequest $request): RedirectResponse
    {
        foreach ($request->normalize() as $key => $value) {
            $this->settings->set('trexz::referrals:' . $key, $value);
        }

        $this->alert->success('Referral system has been updated.')->flash();

        return redirect()->route('admin.trexz.referrals');
    }
}
