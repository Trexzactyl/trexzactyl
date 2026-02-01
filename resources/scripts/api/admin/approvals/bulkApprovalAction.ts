import http from '@/api/http';

export default (action: 'approve' | 'deny'): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.post(`/api/admin/approvals/approve/all/${action}`)
            .then(() => resolve())
            .catch(reject);
    });
};
