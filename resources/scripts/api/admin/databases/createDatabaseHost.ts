import http from '@/api/http';

export interface CreateDatabaseHostFields {
    name: string;
    host: string;
    port: number;
    username: string;
    password?: string;
    nodeId: number;
}

export default (fields: CreateDatabaseHostFields): Promise<any> => {
    return new Promise((resolve, reject) => {
        http.post('/api/admin/databases', fields)
            .then(({ data }) => resolve(data))
            .catch(reject);
    });
};
