import http from '@/api/http';

export default (mountId: number, nodeId: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.post(`/api/admin/mounts/${mountId}/nodes`, { nodes: [nodeId] })
            .then(() => resolve())
            .catch(reject);
    });
};
