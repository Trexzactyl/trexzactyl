import http, { FractalResponseList } from '@/api/http';
import { Server } from '@/api/server/getServer'; // Re-using client server definition for now, might need admin specific type later

export default (page: number, query?: string): Promise<FractalResponseList> => {
    return new Promise((resolve, reject) => {
        http.get('/api/admin/servers', { params: { page, query } })
            .then(({ data }) => resolve(data))
            .catch(reject);
    });
};
