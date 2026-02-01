import http from '@/api/http';

export default (serverId: string, databaseId: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.delete(`/api/admin/servers/view/${serverId}/database/${databaseId}/delete`)
            .then(() => resolve())
            .catch(reject);
    });
};
