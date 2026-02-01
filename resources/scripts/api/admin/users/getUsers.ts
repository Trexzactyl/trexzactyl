import http, { FractalResponseList } from '@/api/http';
import { User } from '@/state/user'; // Assuming User is exported here, need to verify

export interface AdminUser extends User {
    id: number;
    uuid: string;
    username: string;
    email: string;
    nameFirst: string;
    nameLast: string;
    rootAdmin: boolean;
    use2fa: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export default (page: number): Promise<FractalResponseList> => {
    return new Promise((resolve, reject) => {
        http.get('/api/admin/users', { params: { page } })
            .then(({ data }) => resolve(data))
            .catch(reject);
    });
};
