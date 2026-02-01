import http from '@/api/http';

export default (id: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.delete(`/api/admin/coupons/${id}`) // Verify route: likely DELETE admin/coupons/{coupon}
            .then(() => resolve())
            .catch(reject);
    });
};
