import http, { FractalResponseList } from '@/api/http';

export interface NodeAllocation {
    id: number;
    ip: string;
    alias: string | null;
    port: number;
    assigned: boolean;
}

export default (nodeId: number, page: number): Promise<FractalResponseList> => {
    return new Promise((resolve, reject) => {
        http.get(`/api/admin/nodes/view/${nodeId}/allocation`, { params: { page } })
            .then(({ data }) => resolve(data))
            .catch(reject);
    });
};
