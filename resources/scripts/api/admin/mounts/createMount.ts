import http from '@/api/http';

export interface CreateMountFields {
    name: string;
    description: string;
    source: string;
    target: string;
    readOnly: boolean;
    userMountable: boolean;
}

export default (fields: CreateMountFields): Promise<any> => {
    return new Promise((resolve, reject) => {
        http.post('/api/admin/mounts', fields)
            .then(({ data }) => resolve(data))
            .catch(reject);
    });
};
