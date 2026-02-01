import http from '@/api/http';

export interface UpdateDatabaseHostFields {
    name?: string;
    host?: string;
    port?: number;
    username?: string;
    password?: string;
    nodeId?: number;
}

export default (id: number, fields: UpdateDatabaseHostFields): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.patch(`/api/admin/databases/view/${id}`, fields)
            .then(() => resolve())
            .catch(reject);
    });
};
