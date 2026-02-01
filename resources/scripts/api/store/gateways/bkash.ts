import http from '@/api/http';

export interface BkashPurchaseResponse {
    transaction_id: number;
    amount: number;
    cost_bdt: number;
    bkash_number: string;
    message: string;
}

export default (amount: number): Promise<BkashPurchaseResponse> => {
    return new Promise((resolve, reject) => {
        http.post('/api/client/store/bkash', { amount })
            .then(({ data }) => resolve(data))
            .catch(reject);
    });
};
