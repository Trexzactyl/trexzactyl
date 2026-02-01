import http from '@/api/http';

export default (nodeId: number, allocationId: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.delete(`/api/admin/nodes/${nodeId}/allocation/${allocationId}`)
            .then(() => resolve())
            .catch(reject);
    });
};
