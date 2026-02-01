import http from '@/api/http';

export interface ServerInstallToggleData {
    installed: boolean;
}

export default (serverId: string, data: ServerInstallToggleData): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.post(`/api/admin/servers/${serverId}/install`, data)
            .then(() => resolve())
            .catch(reject);
    });
};
