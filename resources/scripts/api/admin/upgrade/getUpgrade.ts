import http, { FractalResponseData } from '@/api/http';

export interface AdminUpgrade {
    available: boolean;
    version: string;
    description: string;
}

export default (): Promise<AdminUpgrade> => {
    return new Promise((resolve, reject) => {
        http.get('/api/admin/upgrade')
            .then(({ data }) => resolve(data))
            .catch(reject);
    });
};
