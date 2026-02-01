import http from '@/api/http';

export interface CreateNodeFields {
    name: string;
    locationId: number;
    fqdn: string;
    scheme: 'http' | 'https';
    memory: number;
    memoryOverallocate: number;
    disk: number;
    diskOverallocate: number;
    uploadSize: number;
    daemonSftp: number;
    daemonListen: number;
}

export default (fields: CreateNodeFields): Promise<any> => {
    return new Promise((resolve, reject) => {
        http.post('/api/admin/nodes/new', fields)
            .then(({ data }) => resolve(data))
            .catch(reject);
    });
};
