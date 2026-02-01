import http from '@/api/http';

export interface UpdateNodeFields {
    name?: string;
    locationId?: number;
    fqdn?: string;
    scheme?: 'http' | 'https';
    memory?: number;
    memoryOverallocate?: number;
    disk?: number;
    diskOverallocate?: number;
    uploadSize?: number;
    daemonSftp?: number;
    daemonListen?: number;
}

export default (id: number, fields: UpdateNodeFields): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.patch(`/api/admin/nodes/view/${id}/settings`, fields)
            .then(() => resolve())
            .catch(reject);
    });
};
