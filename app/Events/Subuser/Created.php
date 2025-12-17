<?php

namespace Trexz\Events\Subuser;

use Trexz\Events\Event;
use Trexz\Models\Subuser;
use Illuminate\Queue\SerializesModels;

class Created extends Event
{
    use SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(public Subuser $subuser)
    {
    }
}
