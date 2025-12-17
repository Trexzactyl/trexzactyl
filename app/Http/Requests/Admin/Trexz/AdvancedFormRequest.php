<?php

namespace Trexz\Http\Requests\Admin\Trexz;

use Trexz\Http\Requests\Admin\AdminFormRequest;

class AdvancedFormRequest extends AdminFormRequest
{
    /**
     * Return all the rules to apply to this request's data.
     */
    public function rules(): array
    {
        return [
            'trexz:auth:2fa_required' => 'required|integer|in:0,1,2',

            'recaptcha:enabled' => 'required|in:true,false',
            'recaptcha:secret_key' => 'required|string|max:191',
            'recaptcha:website_key' => 'required|string|max:191',
            'trexz:guzzle:timeout' => 'required|integer|between:1,60',
            'trexz:guzzle:connect_timeout' => 'required|integer|between:1,60',

            'trexz:client_features:allocations:enabled' => 'required|in:true,false',
            'trexz:client_features:allocations:range_start' => [
                'nullable',
                'required_if:trexz:client_features:allocations:enabled,true',
                'integer',
                'between:1024,65535',
            ],
            'trexz:client_features:allocations:range_end' => [
                'nullable',
                'required_if:trexz:client_features:allocations:enabled,true',
                'integer',
                'between:1024,65535',
                'gt:trexz:client_features:allocations:range_start',
            ],
        ];
    }

    public function attributes(): array
    {
        return [
            'recaptcha:enabled' => 'reCAPTCHA Enabled',
            'recaptcha:secret_key' => 'reCAPTCHA Secret Key',
            'recaptcha:website_key' => 'reCAPTCHA Website Key',
            'trexz:guzzle:timeout' => 'HTTP Request Timeout',
            'trexz:guzzle:connect_timeout' => 'HTTP Connection Timeout',
            'trexz:client_features:allocations:enabled' => 'Auto Create Allocations Enabled',
            'trexz:client_features:allocations:range_start' => 'Starting Port',
            'trexz:client_features:allocations:range_end' => 'Ending Port',
        ];
    }
}
