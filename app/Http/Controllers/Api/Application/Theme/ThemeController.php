<?php

namespace Trexz\Http\Controllers\Api\Application\Theme;

use Trexz\Models\Theme;
use Illuminate\Http\Response;
use Trexz\Contracts\Repository\ThemeRepositoryInterface;
use Trexz\Http\Requests\Api\Application\Theme\UpdateThemeRequest;
use Trexz\Http\Controllers\Api\Application\ApplicationApiController;

class ThemeController extends ApplicationApiController
{
    /**
     * ThemeController constructor.
     */
    public function __construct(
        private ThemeRepositoryInterface $settings
    ) {
        parent::__construct();
    }

    /**
     * Update the colors for the panel theme.
     *
     * @throws \Throwable
     */
    public function colors(UpdateThemeRequest $request): Response
    {
        $this->theme->set('theme::colors:' . $request->input('key'), $request->input('value'));

        return $this->returnNoContent();
    }

    /**
     * Reset all of the theme keys to factory defaults.
     */
    public function reset(UpdateThemeRequest $request): Response
    {
        foreach ($this->theme->all() as $setting) {
            $setting->delete();
        }

        return $this->returnNoContent();
    }
}
