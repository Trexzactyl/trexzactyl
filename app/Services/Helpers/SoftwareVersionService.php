<?php

namespace Trexz\Services\Helpers;

use Exception;
use Carbon\CarbonImmutable;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Http;
use Illuminate\Contracts\Cache\Repository as CacheRepository;
use Trexz\Exceptions\Service\Helper\CdnVersionFetchingException;

class SoftwareVersionService
{
    public const VERSION_CACHE_KEY = 'trexz:versioning_data';
    public const GIT_VERSION_CACHE_KEY = 'trexz:git_data';

    private static array $result;

    /**
     * SoftwareVersionService constructor.
     */
    public function __construct(private CacheRepository $cache)
    {
        self::$result = $this->cacheVersionData();
    }

    /**
     * Return the current version of the panel that is being used.
     */
    public function getCurrentVersion(): string
    {
        return config('app.version');
    }

    /**
     * Returns the latest version of the panel from GitHub.
     */
    public function getLatestPanel(): string
    {
        return Arr::get(self::$result, 'panel') ?? '1.0.0';
    }

    /**
     * Returns the latest version of the Wings from GitHub.
     */
    public function getLatestWings(): string
    {
        return Arr::get(self::$result, 'wings') ?? '1.0.0';
    }

    /**
     * Returns the URL to the discord server.
     */
    public function getDiscord(): string
    {
        return Arr::get(self::$result, 'discord') ?? 'https://discord.gg/trexz';
    }

    /**
     * Returns the URL for donations.
     */
    public function getDonations(): string
    {
        return Arr::get(self::$result, 'donations') ?? 'https://github.com/sponsors/trexz';
    }

    /**
     * Determine if the current version of the panel is the latest.
     */
    public function isLatestPanel(): bool
    {
        $version = $this->getCurrentVersion();
        if ($version === 'canary' || $version === 'dev') {
            return true;
        }

        return version_compare($version, $this->getLatestPanel()) >= 0;
    }

    /**
     * Determine if a passed daemon version string is the latest.
     */
    public function isLatestWings(string $version): bool
    {
        if ($version === 'develop' || Str::startsWith($version, 'dev-')) {
            return true;
        }

        return version_compare($version, $this->getLatestWings()) >= 0;
    }

    /**
     * Get version data for the overview.
     */
    public function getVersionData(): array
    {
        $versionData = $this->versionData();
        if ($versionData['is_git']) {
            $git = $versionData['version'];
        } else {
            $git = null;
        }

        return [
            'panel' => [
                'current' => $this->getCurrentVersion(),
                'latest' => $this->getLatestPanel(),
            ],

            'wings' => [
                'latest' => $this->getLatestWings(),
            ],

            'git' => $git,
        ];
    }

    /**
     * Return version information for the footer.
     */
    protected function versionData(): array
    {
        return $this->cache->remember(self::GIT_VERSION_CACHE_KEY, CarbonImmutable::now()->addSeconds(15), function () {
            $configVersion = $this->getCurrentVersion();

            if (file_exists(base_path('.git/HEAD'))) {
                $head = explode(' ', file_get_contents(base_path('.git/HEAD')));

                if (array_key_exists(1, $head)) {
                    $path = base_path('.git/' . trim($head[1]));
                }
            }

            if (isset($path) && file_exists($path)) {
                return [
                    'version' => substr(file_get_contents($path), 0, 8),
                    'is_git' => true,
                ];
            }

            return [
                'version' => $configVersion,
                'is_git' => false,
            ];
        });
    }

    /**
     * Keeps the versioning cache up-to-date with the latest results from GitHub.
     */
    protected function cacheVersionData(): array
    {
        return $this->cache->remember(self::VERSION_CACHE_KEY, CarbonImmutable::now()->addMinutes(config('trexz.cdn.cache_time', 60)), function () {
            try {
                $response = Http::timeout(5)->get(config('trexz.cdn.url'));

                if ($response->successful()) {
                    $data = $response->json();
                    
                    // Parse GitHub release format
                    if (isset($data['tag_name'])) {
                        return [
                            'panel' => ltrim($data['tag_name'], 'v'),
                            'wings' => ltrim($data['tag_name'], 'v'), // Can be different if you have wings releases
                            'discord' => 'https://discord.gg/trexz',
                            'donations' => 'https://github.com/sponsors/trexz',
                        ];
                    }
                    
                    // Legacy format support
                    if (isset($data['panel'])) {
                        return $data;
                    }
                }

                // Fallback values
                return [
                    'panel' => $this->getCurrentVersion(),
                    'wings' => $this->getCurrentVersion(),
                ];
            } catch (Exception $e) {
                return [
                    'panel' => $this->getCurrentVersion(),
                    'wings' => $this->getCurrentVersion(),
                ];
            }
        });
    }
}
