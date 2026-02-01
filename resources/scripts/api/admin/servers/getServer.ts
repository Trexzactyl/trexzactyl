import http, { FractalResponseData } from '@/api/http';
import { Server } from '@/api/server/getServer';

export default (id: number): Promise<Server> => {
    return new Promise((resolve, reject) => {
        http.get(`/api/admin/servers/view/${id}`)
            .then(({ data }) => resolve(data.attributes))
            .catch(reject);
    });
};
