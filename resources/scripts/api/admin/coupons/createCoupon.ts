import http from '@/api/http';

export interface CreateCouponFields {
    code: string;
    discount: number;
    usageLimit: number;
    expiresAt?: string;
}

export default (fields: CreateCouponFields): Promise<any> => {
    return new Promise((resolve, reject) => {
        http.post('/api/admin/coupons/store', fields)
            .then(({ data }) => resolve(data))
            .catch(reject);
    });
};
