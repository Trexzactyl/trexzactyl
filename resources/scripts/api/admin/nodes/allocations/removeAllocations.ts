import http from '@/api/http';

export interface AllocationRemovalData {
    allocations: number[];
}

export default (nodeId: number, data: AllocationRemovalData): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.post(`/api/admin/nodes/${nodeId}/allocation/remove`, data)
            .then(() => resolve())
            .catch(reject);
    });
};
