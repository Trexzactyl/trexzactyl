import http from '@/api/http';
import { AdminNode } from './getNodes';

export default (id: number): Promise<AdminNode> => {
    return new Promise((resolve, reject) => {
        http.get(`/api/admin/nodes/view/${id}`)
            .then(({ data }) => resolve(data))
            .catch(reject);
    });
};
