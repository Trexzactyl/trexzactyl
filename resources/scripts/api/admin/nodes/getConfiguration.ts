import http from '@/api/http';

export interface NodeConfiguration {
    display: string;
    token: string;
}

export default (nodeId: number): Promise<NodeConfiguration> => {
    return new Promise((resolve, reject) => {
        http.get(`/api/admin/nodes/view/${nodeId}/configuration`)
            .then(({ data }) => resolve(data))
            .catch(reject);
    });
};
