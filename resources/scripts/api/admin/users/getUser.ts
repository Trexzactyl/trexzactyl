import http, { FractalResponseData } from '@/api/http';
import { AdminUser } from '@/api/admin/users/getUsers';

export default (id: number): Promise<AdminUser> => {
    return new Promise((resolve, reject) => {
        http.get(`/api/admin/users/view/${id}`)
            .then(({ data }) => resolve(data.attributes))
            .catch(reject);
    });
};
