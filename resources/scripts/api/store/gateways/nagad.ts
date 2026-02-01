import http from '@/api/http';

export interface NagadPurchaseResponse {
    transaction_id: number;
    amount: number;
    cost_bdt: number;
    nagad_number: string;
    message: string;
}

export default (amount: number): Promise<NagadPurchaseResponse> => {
    return new Promise((resolve, reject) => {
        http.post('/api/client/store/nagad', { amount })
            .then(({ data }) => resolve(data))
            .catch(reject);
    });
};
