<?php

namespace Trexz\Http\Requests\Admin\Trexz\Coupons;

use Trexz\Http\Requests\Admin\AdminFormRequest;

class IndexFormRequest extends AdminFormRequest
{
    public function rules(): array
    {
        return [
            'enabled' => 'required|boolean',
        ];
    }
}
