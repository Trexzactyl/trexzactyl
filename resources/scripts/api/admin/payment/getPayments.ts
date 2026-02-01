import http, { FractalResponseList } from '@/api/http';

export interface AdminPayment {
    id: number;
    userId: number;
    creditAmount: number;
    currency: string;
    transactionId: string;
    senderNumber: string;
    status: 'pending' | 'approved' | 'rejected' | 'processing';
    rejectionReason?: string;
    createdAt: Date;
    updatedAt: Date;
}

export default (page: number = 1): Promise<FractalResponseList> => {
    return new Promise((resolve, reject) => {
        http.get('/api/application/payments', { params: { page } })
            .then(({ data }) => resolve(data))
            .catch(reject);
    });
};
