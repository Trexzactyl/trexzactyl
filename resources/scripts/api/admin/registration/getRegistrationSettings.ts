import http from '@/api/http';
import { RegistrationSettings } from './updateRegistrationSettings';

export default (): Promise<RegistrationSettings> => {
    return new Promise((resolve, reject) => {
        http.get('/api/admin/registration')
            .then(({ data }) => resolve(data))
            .catch(reject);
    });
};
