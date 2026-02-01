import http from '@/api/http';

export default (nodeId: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.delete(`/api/admin/nodes/${nodeId}/allocations`)
            .then(() => resolve())
            .catch(reject);
    });
};
