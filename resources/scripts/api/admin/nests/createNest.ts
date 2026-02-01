import http from '@/api/http';

export interface CreateNestFields {
    name: string;
    description: string;
    author: string;
}

export default (fields: CreateNestFields): Promise<any> => {
    return new Promise((resolve, reject) => {
        http.post('/api/admin/nests/new', fields)
            .then(({ data }) => resolve(data))
            .catch(reject);
    });
};
