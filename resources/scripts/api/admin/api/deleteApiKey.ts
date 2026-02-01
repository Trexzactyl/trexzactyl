import http from '@/api/http';

export default (identifier: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.delete(`/api/admin/api/revoke/${identifier}`)
            .then(() => resolve())
            .catch(reject);
    });
};
