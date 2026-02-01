import http from '@/api/http';

export default (mountId: number, nodeId: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.delete(`/api/admin/mounts/${mountId}/nodes/${nodeId}`)
            .then(() => resolve())
            .catch(reject);
    });
};
