import http, { FractalResponseList } from '@/api/http';

export interface NagadTransaction {
    id: number;
    user_id: number;
    amount: number;
    transaction_id: string | null;
    payment_id: string | null;
    status: 'pending' | 'approved' | 'rejected' | 'processing';
    client_number: string | null;
    rejection_reason: string | null;
    created_at: string;
    updated_at: string;
}

export default (page: number = 1): Promise<FractalResponseList> => {
    return new Promise((resolve, reject) => {
        http.get('/api/application/nagad/transactions', { params: { page } })
            .then(({ data }) => resolve(data))
            .catch(reject);
    });
};
