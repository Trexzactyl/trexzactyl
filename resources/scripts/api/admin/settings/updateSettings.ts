import http from '@/api/http';
import { AdminSettings } from './getSettings';

export default (settings: Partial<AdminSettings>): Promise<AdminSettings> => {
    return new Promise((resolve, reject) => {
        http.patch('/api/admin/settings', settings)
            .then(({ data }) => resolve(data))
            .catch(reject);
    });
};
