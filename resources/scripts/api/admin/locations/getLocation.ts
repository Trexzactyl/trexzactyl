import http from '@/api/http';
import { AdminLocation } from './getLocations';

export default (id: number): Promise<AdminLocation> => {
    return new Promise((resolve, reject) => {
        http.get(`/api/admin/locations/view/${id}`)
            .then(({ data }) => resolve(data))
            .catch(reject);
    });
};
