import http from '@/api/http';

export default (id: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.delete(`/api/admin/nodes/view/${id}/delete`)
            .then(() => resolve())
            .catch(reject);
    });
};
