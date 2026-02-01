import http, { FractalResponseList } from '@/api/http';

export interface AdminApproval {
    id: number;
    userId: number;
    ip: string;
    userAgent: string;
    action: 'approve' | 'deny' | 'pending';
    createdAt: Date;
    updatedAt: Date;
}

export default (page: number): Promise<FractalResponseList> => {
    return new Promise((resolve, reject) => {
        http.get('/api/admin/approvals', { params: { page } })
            .then(({ data }) => resolve(data))
            .catch(reject);
    });
};
