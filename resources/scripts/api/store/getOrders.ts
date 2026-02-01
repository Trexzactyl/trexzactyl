import http from '@/api/http';

export interface Order {
    id: number;
    amount_display: string;
    currency: string;
    status: string;
    gateway: string;
    created_at: string;
    rejection_reason?: string;
}

export default (): Promise<Order[]> => {
    return new Promise((resolve, reject) => {
        http.get('/api/client/store/orders')
            .then(({ data }) => resolve(data))
            .catch(reject);
    });
};
