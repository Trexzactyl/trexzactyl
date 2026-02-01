import http from '@/api/http';

export default (nodeId: number): Promise<string> => {
    return new Promise((resolve, reject) => {
        http.post(`/api/admin/nodes/view/${nodeId}/settings/token`)
            .then(({ data }) => resolve(data.token || data))
            .catch(reject);
    });
};
