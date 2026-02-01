import http, { FractalResponseList } from '@/api/http';

export interface AdminCoupon {
    id: number;
    code: string;
    discount: number;
    usageLimit: number;
    uses: number;
    expiresAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}

export default (page: number): Promise<FractalResponseList> => {
    return new Promise((resolve, reject) => {
        http.get('/api/admin/coupons', { params: { page } })
            .then(({ data }) => resolve(data))
            .catch(reject);
    });
};
