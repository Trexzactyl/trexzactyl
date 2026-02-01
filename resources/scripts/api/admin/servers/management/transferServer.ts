import http from '@/api/http';

export default (id: number, nodeId: number, allocationId: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.post(`/api/admin/servers/view/${id}/manage/transfer`, {
            node_id: nodeId,
            allocation_id: allocationId,
        })
            .then(() => resolve())
            .catch(reject);
    });
};
