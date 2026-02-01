import http from '@/api/http';

export default (id: number, reason?: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.post(`/api/application/payments/${id}/reject`, { reason })
            .then(() => resolve())
            .catch(reject);
    });
};