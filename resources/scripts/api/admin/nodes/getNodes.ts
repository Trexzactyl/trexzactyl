import http, { FractalResponseList } from '@/api/http';

export interface AdminNode {
    id: number;
    name: string;
    public: boolean;
    fqdn: string;
    scheme: string;
    behindProxy: boolean;
    maintenanceMode: boolean;
    memory: number;
    startOnCompletion: boolean;
    memoryOverallocate: number;
    disk: number;
    diskOverallocate: number;
    uploadSize: number;
    daemonListen: number;
    daemonSftp: number;
    createdAt: Date;
    updatedAt: Date;
}

export default (page: number): Promise<FractalResponseList> => {
    return new Promise((resolve, reject) => {
        http.get('/api/admin/nodes', { params: { page } })
            .then(({ data }) => resolve(data))
            .catch(reject);
    });
};
