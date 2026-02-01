import http from '@/api/http';

export const mountServer = (serverId: number, mountId: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.post(`/api/admin/servers/view/${serverId}/mounts`, { mount_id: mountId })
            .then(() => resolve())
            .catch(reject);
    });
};

export const unmountServer = (serverId: number, mountId: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.delete(`/api/admin/servers/view/${serverId}/mounts/${mountId}`)
            .then(() => resolve())
            .catch(reject);
    });
};
