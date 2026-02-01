import http from '@/api/http';

export default (transactionId: number, reason?: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.post(`/api/application/bkash/reject/${transactionId}`, { reason })
            .then(() => resolve())
            .catch(reject);
    });
};