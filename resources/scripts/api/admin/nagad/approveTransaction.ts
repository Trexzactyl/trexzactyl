import http from '@/api/http';

export default (transactionId: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.post(`/api/application/nagad/approve/${transactionId}`)
            .then(() => resolve())
            .catch(reject);
    });
};
