import http from '@/api/http';

export interface UpdateCouponFields {
    code?: string;
    discount?: number;
    usageLimit?: number;
    expiresAt?: string | null;
}

export default (fields: UpdateCouponFields): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.patch('/api/admin/coupons', fields)
            .then(() => resolve())
            .catch(reject);
    });
};
