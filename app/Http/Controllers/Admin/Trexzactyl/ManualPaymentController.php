<?php

namespace Trexzactyl\Http\Controllers\Admin\Trexzactyl;

use Illuminate\View\View;
use Illuminate\Http\Request;
use Trexzactyl\Models\ManualPayment;
use Illuminate\Http\RedirectResponse;
use Prologue\Alerts\AlertsMessageBag;
use Trexzactyl\Http\Controllers\Controller;
use Trexzactyl\Notifications\PaymentStatusChanged;
use Trexzactyl\Notifications\PaymentApproved;

class ManualPaymentController extends Controller
{
    public function __construct(
        private AlertsMessageBag $alert,
        private \Trexzactyl\Contracts\Repository\SettingsRepositoryInterface $settings
    ) {
    }

    public function index(): View
    {
        $payments = ManualPayment::with('user')->where('status', 'pending')->get();
        $bkash = \Trexzactyl\Models\Bkash::with('user')->where('status', 'pending')->get();
        $nagad = \Trexzactyl\Models\Nagad::with('user')->where('status', 'pending')->get();

        $ratio = $this->settings->get('Trexzactyl::store:currency_ratio', 1);

        return view('admin.trexzactyl.payments', [
            'payments' => $payments,
            'bkash' => $bkash,
            'nagad' => $nagad,
            'ratio' => $ratio,
        ]);
    }

    public function approve(int $id): RedirectResponse
    {
        $payment = ManualPayment::findOrFail($id);

        if ($payment->status !== 'pending') {
            $this->alert->danger('This payment has already been processed.')->flash();
            return redirect()->back();
        }

        $payment->status = 'approved';
        $payment->save();

        // Add credits to user
        $user = $payment->user;
        $user->store_balance += $payment->credit_amount;
        $user->save();

        // Notify user
        $user->notify(new PaymentStatusChanged($payment->credit_amount, $payment->currency, 'approved', null, 'Manual'));

        $this->alert->success('Payment approved and credits added.')->flash();
        return redirect()->back();
    }

    public function reject(Request $request, int $id): RedirectResponse
    {
        $payment = ManualPayment::findOrFail($id);
        $payment->status = 'rejected';
        $payment->rejection_reason = $request->input('reason');
        $payment->save();

        $payment->user->notify(new PaymentStatusChanged($payment->credit_amount, $payment->currency, 'rejected', $payment->rejection_reason, 'Manual'));

        $this->alert->success('Payment rejected.')->flash();
        return redirect()->back();
    }

    public function process(int $id): RedirectResponse
    {
        $payment = ManualPayment::findOrFail($id);
        $payment->status = 'processing';
        $payment->save();

        $payment->user->notify(new PaymentStatusChanged($payment->credit_amount, $payment->currency, 'processing', null, 'Manual'));

        $this->alert->success('Payment marked as processing.')->flash();
        return redirect()->back();
    }

    public function approveBkash(int $id): RedirectResponse
    {
        $payment = \Trexzactyl\Models\Bkash::findOrFail($id);

        if ($payment->status !== 'pending') {
            $this->alert->danger('This payment has already been processed.')->flash();
            return redirect()->back();
        }

        $payment->status = 'approved';
        $payment->save();

        // Add credits to user
        $user = $payment->user;
        $user->store_balance += $payment->amount;
        $user->save();

        // Notify user (assuming BDT currency for bKash)
        $user->notify(new PaymentStatusChanged($payment->amount, 'Credits', 'approved', null, 'bKash'));

        $this->alert->success('bKash Payment approved and credits added.')->flash();
        return redirect()->back();
    }

    public function rejectBkash(Request $request, int $id): RedirectResponse
    {
        $payment = \Trexzactyl\Models\Bkash::findOrFail($id);
        $payment->status = 'rejected';
        $payment->rejection_reason = $request->input('reason');
        $payment->save();

        $payment->user->notify(new PaymentStatusChanged($payment->amount, 'Credits', 'rejected', $payment->rejection_reason, 'bKash'));

        $this->alert->success('bKash Payment rejected.')->flash();
        return redirect()->back();
    }

    public function processBkash(int $id): RedirectResponse
    {
        $payment = \Trexzactyl\Models\Bkash::findOrFail($id);
        $payment->status = 'processing';
        $payment->save();

        $payment->user->notify(new PaymentStatusChanged($payment->amount, 'Credits', 'processing', null, 'bKash'));

        $this->alert->success('bKash Payment marked as processing.')->flash();
        return redirect()->back();
    }

    public function approveNagad(int $id): RedirectResponse
    {
        $payment = \Trexzactyl\Models\Nagad::findOrFail($id);

        if ($payment->status !== 'pending') {
            $this->alert->danger('This payment has already been processed.')->flash();
            return redirect()->back();
        }

        $payment->status = 'approved';
        $payment->save();

        // Add credits to user
        $user = $payment->user;
        $user->store_balance += $payment->amount;
        $user->save();

        // Notify user (assuming BDT currency for Nagad)
        $user->notify(new PaymentStatusChanged($payment->amount, 'Credits', 'approved', null, 'Nagad'));

        $this->alert->success('Nagad Payment approved and credits added.')->flash();
        return redirect()->back();
    }

    public function rejectNagad(Request $request, int $id): RedirectResponse
    {
        $payment = \Trexzactyl\Models\Nagad::findOrFail($id);
        $payment->status = 'rejected';
        $payment->rejection_reason = $request->input('reason');
        $payment->save();

        $payment->user->notify(new PaymentStatusChanged($payment->amount, 'Credits', 'rejected', $payment->rejection_reason, 'Nagad'));

        $this->alert->success('Nagad Payment rejected.')->flash();
        return redirect()->back();
    }

    public function processNagad(int $id): RedirectResponse
    {
        $payment = \Trexzactyl\Models\Nagad::findOrFail($id);
        $payment->status = 'processing';
        $payment->save();

        $payment->user->notify(new PaymentStatusChanged($payment->amount, 'Credits', 'processing', null, 'Nagad'));

        $this->alert->success('Nagad Payment marked as processing.')->flash();
        return redirect()->back();
    }
}
