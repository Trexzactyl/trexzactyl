import http from '@/api/http';

export interface UpdateServerDatabaseFields {
    remote: string;
}

export default (serverId: string, fields: UpdateServerDatabaseFields): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.patch(`/api/admin/servers/view/${serverId}/database`, fields)
            .then(() => resolve())
            .catch(reject);
    });
};
