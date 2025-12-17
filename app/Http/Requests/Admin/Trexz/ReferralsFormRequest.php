<?php

namespace Trexz\Http\Requests\Admin\Trexz;

use Trexz\Http\Requests\Admin\AdminFormRequest;

class ReferralsFormRequest extends AdminFormRequest
{
    public function rules(): array
    {
        return [
            'enabled' => 'required|in:true,false',
            'reward' => 'required|min:0',
        ];
    }
}
