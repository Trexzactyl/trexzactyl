import tw from 'twin.macro';
import * as Icon from 'react-feather';
import { useStoreState } from '@/state/hooks';
import React, { useEffect, useState } from 'react';
import Spinner from '@/components/elements/Spinner';
import GlassCard from '@/components/elements/GlassCard';
import { getResources, Resources } from '@/api/store/getResources';
import PageContentBlock from '@/components/elements/PageContentBlock';
import StripePurchaseForm from '@/components/store/forms/StripePurchaseForm';
import PaypalPurchaseForm from '@/components/store/forms/PaypalPurchaseForm';
import BkashPurchaseForm from '@/components/store/forms/BkashPurchaseForm';
import NagadPurchaseForm from '@/components/store/forms/NagadPurchaseForm';

export default () => {
    const [resources, setResources] = useState<Resources>();
    const earn = useStoreState((state) => state.storefront.data?.earn);
    const paypal = useStoreState((state) => state.storefront.data?.gateways?.paypal);
    const stripe = useStoreState((state) => state.storefront.data?.gateways?.stripe);
    const bkash = useStoreState((state) => state.storefront.data?.gateways?.bkash);
    const nagad = useStoreState((state) => state.storefront.data?.gateways?.nagad);

    useEffect(() => {
        getResources().then((resources) => setResources(resources));
    }, []);

    if (!resources || !earn) return <Spinner size={'large'} centered />;

    return (
        <PageContentBlock title={'Account Balance'} description={'Purchase credits easily via Stripe or PayPal.'}>
            <div css={tw`lg:grid lg:grid-cols-2 my-10 gap-8`}>
                <GlassCard css={tw`p-10 flex flex-col items-center justify-center text-center relative overflow-hidden`}>
                    <div css={tw`relative z-10`}>
                        <div css={tw`bg-blue-600 bg-opacity-10 w-16 h-16 rounded-sm flex items-center justify-center mx-auto mb-6 border border-blue-500 border-opacity-20 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                            <Icon.DollarSign size={32} css={tw`text-blue-400`} strokeWidth={2.5} />
                        </div>
                        <p css={tw`text-neutral-500 font-bold text-xs mb-2`}>Total Available Assets</p>
                        <h1 css={tw`text-6xl md:text-7xl font-black text-white flex items-baseline justify-center`}>
                            {resources.balance.toLocaleString()}{' '}
                            <span css={tw`text-neutral-500 text-2xl ml-4 font-bold`}>Credits</span>
                        </h1>
                    </div>
                </GlassCard>

                <GlassCard css={tw`p-10 flex flex-col items-center justify-center text-center relative overflow-hidden`}>
                    <p css={tw`text-xs font-bold text-neutral-500 mb-8`}>Secure Checkout</p>
                    <div css={tw`w-full max-w-sm relative z-10`}>
                        {!paypal && !stripe && !bkash && !nagad ? (
                            <p className={'text-gray-400 text-sm font-bold'}>Payment gateways are offline.</p>
                        ) : (
                            <div css={tw`space-y-6`}>
                                {paypal && (
                                    <div css={tw`shadow-lg hover:shadow-xl transition-all p-1 bg-white/5 rounded-sm border border-white/5 hover:bg-white/10`}>
                                        <PaypalPurchaseForm />
                                    </div>
                                )}
                                {stripe && (
                                    <div css={tw`shadow-lg hover:shadow-xl transition-all p-1 bg-white/5 rounded-sm border border-white/5 text-left hover:bg-white/10`}>
                                        <StripePurchaseForm />
                                    </div>
                                )}
                                {bkash && (
                                    <div css={tw`shadow-lg hover:shadow-xl transition-all bg-white/5 rounded-sm border border-white/5 text-left hover:bg-white/10 overflow-hidden`}>
                                        <BkashPurchaseForm />
                                    </div>
                                )}
                                {nagad && (
                                    <div css={tw`shadow-lg hover:shadow-xl transition-all bg-white/5 rounded-sm border border-white/5 text-left hover:bg-white/10 overflow-hidden`}>
                                        <NagadPurchaseForm />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </GlassCard>
            </div>

            {earn.enabled && (
                <div css={tw`mt-32 mb-20`}>
                    <div css={tw`flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6`}>
                        <div>
                            <h1 css={tw`text-5xl font-black text-white mr-4`}>Idle Earning</h1>
                            <h3 css={tw`text-xl text-neutral-500 font-bold mt-2`}>Rewards for active sessions</h3>
                        </div>
                    </div>

                    <div css={tw`lg:grid lg:grid-cols-2 gap-8`}>
                        <GlassCard css={tw`p-12 flex flex-col items-center justify-center text-center relative overflow-hidden`}>
                            <div css={tw`bg-green-600 bg-opacity-10 w-20 h-20 rounded-sm flex items-center justify-center mb-8 border border-green-500 border-opacity-20 group-hover:rotate-12 transition-transform duration-500 shadow-lg`}>
                                <Icon.Zap size={40} css={tw`text-green-400 animate-pulse`} strokeWidth={2.5} />
                            </div>
                            <p css={tw`text-neutral-500 font-bold text-xs mb-4`}>Live Accumulation Rate</p>
                            <h1 css={tw`text-7xl font-black text-white flex items-baseline tracking-tighter`}>
                                {earn.amount} <span css={tw`text-2xl ml-4 font-bold text-green-400`}>Cr / Min</span>
                            </h1>
                        </GlassCard>

                        <GlassCard css={tw`p-12 flex flex-col justify-center relative overflow-hidden`}>
                            <h3 css={tw`text-xl font-bold text-white mb-6 flex items-center`}>
                                <Icon.Info css={tw`mr-3 text-blue-400`} size={24} strokeWidth={2.5} />
                                Protocol Manual
                            </h3>
                            <div css={tw`space-y-6 relative z-10 font-bold`}>
                                <p css={tw`text-neutral-400 text-sm leading-loose`}>
                                    Your account balance increases automatically while you remain active on the panel.
                                </p>
                                <div css={tw`bg-blue-600 bg-opacity-10 rounded-sm p-6 border border-blue-500 border-opacity-20 group-hover:bg-blue-600 bg-opacity-20 transition-all`}>
                                    <p css={tw`text-sm text-blue-300 tracking-wide italic leading-relaxed`}>
                                        <span css={tw`text-white font-bold mr-1.5`}>{earn.amount} Credits</span>
                                        will be deposited for every 60 seconds of uptime.
                                    </p>
                                </div>
                            </div>
                        </GlassCard>
                    </div>
                </div>
            )}
        </PageContentBlock>
    );
};
