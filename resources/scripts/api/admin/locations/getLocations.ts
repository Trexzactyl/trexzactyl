import http, { FractalResponseList } from '@/api/http';

export interface AdminLocation {
    id: number;
    short: string;
    long: string;
    createdAt: Date;
    updatedAt: Date;
}

export default (page: number): Promise<FractalResponseList> => {
    return new Promise((resolve, reject) => {
        http.get('/api/admin/locations', { params: { page } })
            .then(({ data }) => resolve(data))
            .catch(reject);
    });
};
