<?php

namespace Trexzactyl\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PaymentStatusChanged extends Notification
{
    use Queueable;

    public $amount;
    public $currency;
    public $status;
    public $reason;
    public $gateway;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($amount, $currency, $status, $reason = null, $gateway = 'Manual')
    {
        $this->amount = $amount;
        $this->currency = $currency;
        $this->status = $status;
        $this->reason = $reason;
        $this->gateway = $gateway;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $mail = (new MailMessage)
            ->subject('Payment Status Update: ' . ucfirst($this->status))
            ->greeting('Hello ' . $notifiable->username . ',')
            ->line('Your payment of ' . $this->amount . ' ' . $this->currency . ' via ' . $this->gateway . ' has been marked as **' . strtoupper($this->status) . '**.');

        if ($this->status === 'rejected' && $this->reason) {
            $mail->line('**Reason for Rejection:**')
                ->line($this->reason);
        }

        if ($this->status === 'approved') {
            $mail->line('The credits have been added to your account.');
        }

        return $mail->action('View My Orders', url('/store/orders'))
            ->line('Thank you for choosing our services!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
