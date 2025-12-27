import http from '@/api/http';
import { Node, rawDataToNode } from '@/api/routes/admin/nodes/getNodes';

export default (id: number): Promise<Node> => {
    return new Promise((resolve, reject) => {
        http.post(`/api/application/nodes/${id}/reset-token`)
            .then(({ data }) => resolve(rawDataToNode(data)))
            .catch(reject);
    });
};
