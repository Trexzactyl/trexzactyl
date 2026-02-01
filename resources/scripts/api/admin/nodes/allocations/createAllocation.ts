import http from '@/api/http';

export default (nodeId: number, fields: { ip: string; ports: string[] }): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.post(`/api/admin/nodes/view/${nodeId}/allocation`, fields)
            .then(() => resolve())
            .catch(reject);
    });
};
