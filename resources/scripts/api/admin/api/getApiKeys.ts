import http, { FractalResponseList } from '@/api/http';

export interface AdminApiKey {
    id: number;
    identifier: string;
    description: string;
    allowedIps: string[];
    createdAt: Date;
    lastUsedAt: Date | null;
}

export default (): Promise<FractalResponseList> => {
    return new Promise((resolve, reject) => {
        http.get('/api/admin/api')
            .then(({ data }) => resolve(data))
            .catch(reject);
    });
};
