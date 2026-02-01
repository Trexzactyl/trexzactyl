import http, { FractalResponseList } from '@/api/http';

export interface AdminNest {
    id: number;
    uuid: string;
    author: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

export default (page: number): Promise<FractalResponseList> => {
    return new Promise((resolve, reject) => {
        http.get('/api/admin/nests', { params: { page } })
            .then(({ data }) => resolve(data))
            .catch(reject);
    });
};
