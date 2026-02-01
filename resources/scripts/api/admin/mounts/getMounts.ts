import http, { FractalResponseList } from '@/api/http';

export interface AdminMount {
    id: number;
    uuid: string;
    name: string;
    description: string;
    source: string;
    target: string;
    readOnly: boolean;
    userMountable: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export default (page: number): Promise<FractalResponseList> => {
    return new Promise((resolve, reject) => {
        http.get('/api/admin/mounts', { params: { page } })
            .then(({ data }) => resolve(data))
            .catch(reject);
    });
};
