import http from '@/api/http';

export default (transactionId: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.post(`/admin/payments/bkash/process/${transactionId}`)
            .then(() => resolve())
            .catch(reject);
    });
};