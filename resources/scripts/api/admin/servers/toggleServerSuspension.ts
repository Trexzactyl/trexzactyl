import http from '@/api/http';

export interface ServerSuspensionData {
    action: 'suspend' | 'unsuspend';
}

export default (serverId: string, data: ServerSuspensionData): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.post(`/api/admin/servers/${serverId}/suspension`, data)
            .then(() => resolve())
            .catch(reject);
    });
};
