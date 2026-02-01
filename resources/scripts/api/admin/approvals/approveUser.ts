import http from '@/api/http';

export default (id: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.post(`/api/admin/approvals/approve/${id}`)
            .then(() => resolve())
            .catch(reject);
    });
};
