import http from '@/api/http';

export interface CreateLocationFields {
    short: string;
    long: string;
}

export default (fields: CreateLocationFields): Promise<any> => {
    return new Promise((resolve, reject) => {
        http.post('/api/admin/locations', fields)
            .then(({ data }) => resolve(data))
            .catch(reject);
    });
};
