import { createStore } from 'easy-peasy';
import user, { UserStore } from '@/state/user';
import theme, { ThemeStore } from '@/state/theme';
import flashes, { FlashStore } from '@/state/flashes';
import everest, { EverestStore } from '@/state/trexz';
import settings, { SettingsStore } from '@/state/settings';
import progress, { ProgressStore } from '@/state/progress';
import permissions, { GloablPermissionsStore } from '@/state/server/permissions';
import storefront, { StorefrontStore } from '@/state/storefront';

export interface ApplicationStore {
    permissions: GloablPermissionsStore;
    flashes: FlashStore;
    user: UserStore;
    settings: SettingsStore;
    progress: ProgressStore;
    everest: EverestStore;
    theme: ThemeStore;
    storefront: StorefrontStore;
}

const state: ApplicationStore = {
    permissions,
    flashes,
    user,
    settings,
    progress,
    everest,
    theme,
    storefront,
};

export const store = createStore(state);
