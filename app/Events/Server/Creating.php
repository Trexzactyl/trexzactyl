<?php

namespace Trexz\Events\Server;

use Trexz\Events\Event;
use Trexz\Models\Server;
use Illuminate\Queue\SerializesModels;

class Creating extends Event
{
    use SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(public Server $server)
    {
    }
}
