import http from '@/api/http';

export interface ServerTransferData {
    node_id: number;
    allocation_id: number;
    additional_allocations?: number[];
}

export default (serverId: string, data: ServerTransferData): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.post(`/api/admin/servers/${serverId}/transfer`, data)
            .then(() => resolve())
            .catch(reject);
    });
};
