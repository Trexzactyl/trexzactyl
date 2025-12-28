import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PageContentBlock from '@/components/elements/PageContentBlock';
import FlashMessageRender from '@/components/FlashMessageRender';
import tw from 'twin.macro';

export default () => {
    const { state } = useLocation();

    return (
        <PageContentBlock title={'Locations'}>
            <FlashMessageRender byKey={'admin:locations'} css={tw`mb-4`} />

            <div css={tw`flex justify-between items-center mb-6`}>
                <h1 css={tw`text-3xl font-bold text-neutral-200`}>Locations</h1>
                <button css={tw`bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded transition-colors`}>
                    Create New
                </button>
            </div>

            <div css={tw`bg-neutral-800 rounded-lg p-6 border border-neutral-700`}>
                <p css={tw`text-neutral-400 text-center`}>
                    Location management is currently under construction.
                </p>
            </div>
        </PageContentBlock>
    );
};
