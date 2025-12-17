<?php

namespace Trexz\Http\Requests\Admin\Trexz;

use Trexz\Http\Requests\Admin\AdminFormRequest;

class AppearanceFormRequest extends AdminFormRequest
{
    public function rules(): array
    {
        return [
            'app:name' => 'required|string|max:191',
            'app:logo' => 'required|string|max:191',
            'theme:user:background' => 'nullable|url',
            'theme:admin' => 'required|string|in:trexz,dark,light,blue,minecraft',
        ];
    }
}
