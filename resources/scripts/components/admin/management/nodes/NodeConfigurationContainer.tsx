import { faClipboard, faCode, faDownload, faSync } from '@fortawesome/free-solid-svg-icons';
import type { Actions } from 'easy-peasy';
import { useStoreActions } from 'easy-peasy';
import { useEffect, useState } from 'react';
import tw from 'twin.macro';
import getNodeConfiguration from '@/api/routes/admin/nodes/getNodeConfiguration';
import resetNodeToken from '@/api/routes/admin/nodes/resetNodeToken';
import AdminBox from '@/elements/AdminBox';
import { Context } from '@admin/management/nodes/NodeRouter';
import CopyOnClick from '@/elements/CopyOnClick';
import type { ApplicationStore } from '@/state';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@/elements/button';
import { Dialog } from '@/elements/dialog';

export default () => {
    const { clearFlashes, clearAndAddHttpError, addFlash } = useStoreActions(
        (actions: Actions<ApplicationStore>) => actions.flashes,
    );

    const [configuration, setConfiguration] = useState('');
    const [showResetModal, setShowResetModal] = useState(false);
    const [isResetting, setIsResetting] = useState(false);

    const node = Context.useStoreState(state => state.node);

    if (node === undefined) {
        return <></>;
    }

    useEffect(() => {
        clearFlashes('node');

        getNodeConfiguration(node.id)
            .then(configuration => setConfiguration(configuration))
            .catch(error => {
                console.error(error);
                clearAndAddHttpError({ key: 'node', error });
            });
    }, []);

    const handleResetToken = () => {
        setIsResetting(true);
        clearFlashes('node');
        resetNodeToken(node.id)
            .then((response) => {
                setShowResetModal(false);
                
                // Check if daemon was offline
                if (response.meta?.daemon_offline && response.meta?.warning) {
                    addFlash({
                        key: 'node',
                        type: 'warning',
                        message: response.meta.warning,
                    });
                } else {
                    addFlash({
                        key: 'node',
                        type: 'success',
                        message: 'Node token has been reset successfully.',
                    });
                }
                
                // Reload configuration after token reset
                return getNodeConfiguration(node.id);
            })
            .then(configuration => setConfiguration(configuration))
            .catch(error => {
                console.error(error);
                clearAndAddHttpError({ key: 'node', error });
            })
            .finally(() => setIsResetting(false));
    };

    const downloadConfig = () => {
        const blob = new Blob([configuration], { type: 'text/yaml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `node-${node.id}-config.yml`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <>
            <AdminBox title={'Configuration'} icon={faCode} css={tw`mb-4`}>
                <div css={tw`flex gap-2 mb-4`}>
                    <Button.Text
                        onClick={downloadConfig}
                    >
                        <FontAwesomeIcon icon={faDownload} css={tw`mr-2`} />
                        Download Config
                    </Button.Text>
                    
                    <Button.Danger
                        onClick={() => setShowResetModal(true)}
                    >
                        <FontAwesomeIcon icon={faSync} css={tw`mr-2`} />
                        Reset Token
                    </Button.Danger>
                </div>

                <div css={tw`relative`}>
                    <div css={tw`absolute top-0 right-0`}>
                        <CopyOnClick text={configuration} showInNotification={false}>
                            <FontAwesomeIcon
                                icon={faClipboard}
                                className={'p-4 text-gray-400 hover:text-gray-200 duration-300'}
                            />
                        </CopyOnClick>
                    </div>
                    <pre css={tw`text-sm rounded font-mono bg-neutral-900 shadow-md px-4 py-3 overflow-x-auto`}>
                        {configuration}
                    </pre>
                </div>
            </AdminBox>

            <Dialog.Confirm
                open={showResetModal}
                title={'Reset Node Token'}
                onClose={() => setShowResetModal(false)}
                onConfirmed={handleResetToken}
                disabled={isResetting}
            >
                Are you sure you want to reset the daemon token for this node? This will require you to update the configuration on the node.
            </Dialog.Confirm>
        </>
    );
};
