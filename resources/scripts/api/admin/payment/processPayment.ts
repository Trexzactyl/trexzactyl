import http from '@/api/http';

export default (id: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.post(`/admin/payments/process/${id}`)
            .then(() => resolve())
            .catch(reject);
    });
};