import http from '@/api/http';

export default (serverId: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.post(`/api/admin/servers/${serverId}/reinstall`)
            .then(() => resolve())
            .catch(reject);
    });
};
