import http from '@/api/http';

export default (mountId: number, eggId: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.delete(`/api/admin/mounts/${mountId}/eggs/${eggId}`)
            .then(() => resolve())
            .catch(reject);
    });
};
