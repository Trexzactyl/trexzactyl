<?php

namespace Trexzactyl\Http\Controllers\Admin\Trexzactyl;

use Illuminate\View\View;
use Illuminate\Http\Request;
use Trexzactyl\Models\ManualPayment;
use Illuminate\Http\RedirectResponse;
use Prologue\Alerts\AlertsMessageBag;
use Trexzactyl\Http\Controllers\Controller;
use Trexzactyl\Notifications\PaymentApproved;

class ManualPaymentController extends Controller
{
    public function __construct(private AlertsMessageBag $alert)
    {
    }

    public function index(): View
    {
        $payments = ManualPayment::with('user')->where('status', 'pending')->get();
        return view('admin.trexzactyl.payments', ['payments' => $payments]);
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
        $user->notify(new PaymentApproved($payment->credit_amount, $payment->currency));

        $this->alert->success('Payment approved and credits added.')->flash();
        return redirect()->back();
    }

    public function reject(int $id): RedirectResponse
    {
        $payment = ManualPayment::findOrFail($id);
        $payment->status = 'rejected';
        $payment->save();

        $this->alert->success('Payment rejected.')->flash();
        return redirect()->back();
    }
}
