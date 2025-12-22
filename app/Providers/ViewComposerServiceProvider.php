<?php

namespace Trexz\Providers;

use Illuminate\Support\ServiceProvider;
use Trexz\Http\ViewComposers\AssetComposer;
use Trexz\Http\ViewComposers\StoreComposer;
use Trexz\Http\ViewComposers\ThemeComposer;
use Trexz\Http\ViewComposers\TrexzComposer;

class ViewComposerServiceProvider extends ServiceProvider
{
    /**
     * Register bindings in the container.
     */
    public function boot(): void
    {
        $this->app->make('view')->composer('*', AssetComposer::class);
        $this->app->make('view')->composer('*', ThemeComposer::class);
        $this->app->make('view')->composer('*', TrexzComposer::class);
        $this->app->make('view')->composer('*', StoreComposer::class);
    }
}
