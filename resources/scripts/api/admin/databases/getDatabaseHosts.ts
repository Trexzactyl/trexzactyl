import http, { FractalResponseList } from '@/api/http';

export interface AdminDatabaseHost {
    id: number;
    name: string;
    host: string;
    port: number;
    username: string;
    maxDatabases: number | null;
    nodeId: number | null;
    createdAt: Date;
    updatedAt: Date;
}

export default (page: number): Promise<FractalResponseList> => {
    return new Promise((resolve, reject) => {
        http.get('/api/admin/databases', { params: { page } })
            .then(({ data }) => resolve(data))
            .catch(reject);
    });
};
