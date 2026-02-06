import useSWR from 'swr';
import { cleanDirectoryPath } from '@/helpers';
import { ServerContext } from '@/state/server';
import loadDirectory, { FileObject } from '@/api/server/files/loadDirectory';

export const getDirectorySwrKey = (uuid: string, directory: string): string => `${uuid}:files:${directory}`;

export default () => {
    const uuid = ServerContext.useStoreState((state) => state.server.data!.uuid);
    const directory = ServerContext.useStoreState((state) => state.files.directory);

    return useSWR<FileObject[]>(
        getDirectorySwrKey(uuid, directory),
        () => loadDirectory(uuid, cleanDirectoryPath(directory)),
        {
            focusThrottleInterval: 30000,
            revalidateOnMount: false,
            refreshInterval: 0,
            errorRetryCount: 3,
            errorRetryInterval: 2000,
            dedupingInterval: 2000,
            shouldRetryOnError: true,
            onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
                // Don't retry on 404
                if (error?.response?.status === 404) return;

                // Max 3 retries
                if (retryCount >= 3) return;

                // Exponential backoff: 2s, 4s, 8s
                setTimeout(() => revalidate({ retryCount }), 2000 * Math.pow(2, retryCount));
            },
        }
    );
};
