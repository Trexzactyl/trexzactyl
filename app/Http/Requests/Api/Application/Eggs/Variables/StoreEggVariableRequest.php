<?php

namespace Trexz\Http\Requests\Api\Application\Eggs\Variables;

use Trexz\Models\AdminRole;
use Trexz\Models\EggVariable;
use Trexz\Http\Requests\Api\Application\ApplicationApiRequest;

class StoreEggVariableRequest extends ApplicationApiRequest
{
    public function rules(array $rules = null): array
    {
        return [
            'name' => 'required|string|min:1|max:191',
            'description' => 'sometimes|string|nullable',
            'env_variable' => 'required|regex:/^[\w]{1,191}$/|notIn:' . EggVariable::RESERVED_ENV_NAMES,
            'default_value' => 'present',
            'user_viewable' => 'required|boolean',
            'user_editable' => 'required|boolean',
            'rules' => 'bail|required|string',
        ];
    }

    public function permission(): string
    {
        return AdminRole::EGGS_CREATE;
    }
}
