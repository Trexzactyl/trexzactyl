<?php

namespace Trexzactyl\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Bkash extends Model
{
    /**
     * The table associated with the model.
     */
    protected $table = 'bkash';

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'user_id',
        'amount',
        'transaction_id',
        'payment_id',
        'status',
        'client_number',
        'rejection_reason',
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
