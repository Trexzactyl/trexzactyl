import http from '@/api/http';
import { CreateResourceFields } from './createResource';

export default (id: number, fields: Partial<CreateResourceFields>): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.patch(`/api/admin/store/resources/${id}`, fields) // Verify actual route
            .then(() => resolve())
            .catch(reject);
    });
};
