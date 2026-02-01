import http, { FractalResponseList } from '@/api/http';

export interface AdminReferral {
    id: number;
    code: string;
    userId: number; // Referrer
    clicks: number;
    registrations: number;
    earnings: number;
    createdAt: Date;
    updatedAt: Date;
}

export default (page: number): Promise<FractalResponseList> => {
    return new Promise((resolve, reject) => {
        http.get('/api/admin/referrals', { params: { page } })
            .then(({ data }) => resolve(data))
            .catch(reject);
    });
};
