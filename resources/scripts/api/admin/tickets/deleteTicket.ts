import http from '@/api/http';

export default (id: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.post(`/api/admin/tickets/${id}/delete`)
            .then(() => resolve())
            .catch(reject);
    });
};
