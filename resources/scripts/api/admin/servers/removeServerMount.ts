import http from '@/api/http';

export default (serverId: string, mountId: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.delete(`/api/admin/servers/${serverId}/mounts/${mountId}`)
            .then(() => resolve())
            .catch(reject);
    });
};
