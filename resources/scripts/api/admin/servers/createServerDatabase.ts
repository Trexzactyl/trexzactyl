import http from '@/api/http';

export interface CreateServerDatabaseFields {
    database: string;
    remote: string;
}

export default (serverId: string, fields: CreateServerDatabaseFields): Promise<any> => {
    return new Promise((resolve, reject) => {
        http.post(`/api/admin/servers/view/${serverId}/database`, fields)
            .then(({ data }) => resolve(data))
            .catch(reject);
    });
};
