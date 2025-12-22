import React from 'react';
import tw from 'twin.macro';
import '@/assets/tailwind.css';
import { store } from '@/state';
import { StoreProvider } from 'easy-peasy';
import { hot } from 'react-hot-loader/root';
import { SiteSettings } from '@/state/settings';
import IndexRouter from '@/routers/IndexRouter';
import earnCredits from '@/api/account/earnCredits';
import { StorefrontSettings } from '@/state/storefront';
import GlobalStylesheet from '@/assets/css/GlobalStylesheet';
import { EverestSettings } from '@/state/everest';
// ... imports

interface ExtendedWindow extends Window {
    SiteConfiguration?: SiteSettings;
    StoreConfiguration?: StorefrontSettings;
    TrexzConfiguration?: EverestSettings;
    TrexzUser?: {
        uuid: string;
        username: string;
        email: string;
        approved: boolean;
        verified: boolean;
        /* eslint-disable camelcase */
        discord_id: string;
        root_admin: boolean;
        use_totp: boolean;
        referral_code: string;
        language: string;
        updated_at: string;
        created_at: string;
        /* eslint-enable camelcase */
    };
}

const App = () => {
    const { TrexzUser, SiteConfiguration, StoreConfiguration, TrexzConfiguration } = window as ExtendedWindow;

    if (TrexzUser && !store.getState().user.data) {
        store.getActions().user.setUserData({
            uuid: TrexzUser.uuid,
            username: TrexzUser.username,
            email: TrexzUser.email,
            approved: TrexzUser.approved,
            verified: TrexzUser.verified,
            discordId: TrexzUser.discord_id,
            language: TrexzUser.language,
            rootAdmin: TrexzUser.root_admin,
            useTotp: TrexzUser.use_totp,
            referralCode: TrexzUser.referral_code,
            avatarURL: '',
            roleName: '',
            state: '',
            createdAt: new Date(TrexzUser.created_at),
            updatedAt: new Date(TrexzUser.updated_at),
        });
    }

    if (SiteConfiguration && !store.getState().settings.data) {
        store.getActions().settings.setSettings(SiteConfiguration);
    }

    if (StoreConfiguration && !store.getState().storefront.data) {
        store.getActions().storefront.setStorefront(StoreConfiguration);
    }

    if (TrexzConfiguration && !store.getState().everest.data) {
        store.getActions().everest.setEverest(TrexzConfiguration);
    }

    React.useEffect(() => {
        if (TrexzUser) {
            function earn() {
                setTimeout(earn, 61000); // Allow 1 second for time inconsistencies.
                earnCredits().catch(() => console.error('Failed to add credits'));
            }
            earn();
        }
    }, [TrexzUser]);

    return (
        <>
            <GlobalStylesheet />
            <StoreProvider store={store}>
                <div css={tw`mx-auto w-auto`}>
                    <IndexRouter />
                </div>
            </StoreProvider>
        </>
    );
};

export default hot(App);
