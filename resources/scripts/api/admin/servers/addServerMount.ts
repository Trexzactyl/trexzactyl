import http from '@/api/http';

export interface ServerMountData {
    mount_id: number;
}

export default (serverId: string, data: ServerMountData): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.post(`/api/admin/servers/${serverId}/mounts`, data)
            .then(() => resolve())
            .catch(reject);
    });
};
