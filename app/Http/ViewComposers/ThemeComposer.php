<?php

namespace Trexz\Http\ViewComposers;

use Illuminate\View\View;

class ThemeComposer
{
    /**
     * Provide access to the asset service in the views.
     */
    public function compose(View $view): void
    {
        $view->with('themeConfiguration', [
            'colors' => [
                'primary' => config('colors.primary') ?? config('theme.colors.primary', '#16a34a'),
                'secondary' => config('colors.secondary') ?? config('theme.colors.secondary', '#27272a'),

                'background' => config('colors.background') ?? config('theme.colors.background', '#141414'),
                'headers' => config('colors.headers') ?? config('theme.colors.headers', '#171717'),
                'sidebar' => config('colors.sidebar') ?? config('theme.colors.sidebar', '#18181b'),
            ],
        ]);
    }
}
