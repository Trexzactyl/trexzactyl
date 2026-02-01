import http, { FractalResponseData } from '@/api/http';

interface CreateUserFields {
    email: string;
    username: string;
    nameFirst: string;
    nameLast: string;
    password?: string;
    rootAdmin: boolean;
}

export default (fields: CreateUserFields): Promise<any> => {
    return new Promise((resolve, reject) => {
        http.post('/api/admin/users/new', fields)
            .then(({ data }) => resolve(data))
            .catch(reject);
    });
};
