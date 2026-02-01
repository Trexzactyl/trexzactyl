import http from '@/api/http';

export default (nodeId: number, allocationId: number, alias: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.post(`/api/admin/nodes/view/${nodeId}/allocation/alias`, { allocation_id: allocationId, alias })
            .then(() => resolve())
            .catch(reject);
    });
};
