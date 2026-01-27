<?php

namespace Trexzactyl\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ManualPayment extends Model
{
    /**
     * The table associated with the model.
     */
    protected $table = 'manual_payments';

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'user_id',
        'credit_amount',
        'currency',
        'transaction_id',
        'sender_number',
        'status',
    ];

    /**
     * Get the user that owns the payment.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
