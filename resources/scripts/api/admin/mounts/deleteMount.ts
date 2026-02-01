import http from '@/api/http';

export default (mountId: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.delete(`/api/admin/mounts/${mountId}`)
            .then(() => resolve())
            .catch(reject);
    });
};
